import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Geolocation from 'react-native-geolocation-service';

MapLibreGL.setAccessToken(null);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pengaduanData: [],
      userLocation: null,
      newMarkerLocation: null,
      isFormVisible: false,
      isMarkerDetailsVisible: false,
      formData: {
        id: '',
        category: '',
        title: '',
        report: '',
        date: '',
        location: {
          latitude: null,
          longitude: null,
        },
      },
    };
  }

  // Mendapatkan lokasi pengguna
  async getUserLocation() {
    try {
      if (Platform.OS === 'android') {
        const hasLocationPermission = await this.requestAndroidPermission();
        if (!hasLocationPermission) {
          Alert.alert('Permission Denied', 'Permission to access location was denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          console.log('Position:', position); // log posisi yang didapat
          this.setState({ userLocation: position.coords });
        },
        (error) => {
          console.error('Error getting location:', error);
          Alert.alert('Error', 'Failed to get user location');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get user location');
    }
  }

  // Android permissions request
  async requestAndroidPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show the map.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  componentDidMount() {
    this.getUserLocation();
    this.fetchMarkers();
  }

  // Fungsi pengambilan data dari API
  fetchMarkers = async () => {
    try {
      const response = await fetch('http://192.168.8.101:3000/pengaduan');
      if (!response.ok) {
        throw new Error('Failed to fetch markers');
      }
      const data = await response.json();
      const cleanedData = data.map((pengaduan) => ({
        ...pengaduan,
        latitude: parseFloat(pengaduan.location.latitude),
        longitude: parseFloat(pengaduan.location.longitude),
      }));
      this.setState({ pengaduanData: cleanedData });
    } catch (error) {
      console.error('Error fetching markers:', error);
      Alert.alert('Error', 'Failed to load markers from API.');
    }
  };

  // Method to handle map press for new marker
  onMapPress = (e) => {
    const coordinates = e.geometry?.coordinates;

    if (Array.isArray(coordinates)) {
      const longitude = parseFloat(coordinates[0]);
      const latitude = parseFloat(coordinates[1]);

      // Validasi koordinat
      if (isNaN(longitude) || isNaN(latitude)) {
        Alert.alert('Error', 'Invalid coordinates. Please try again.');
        return;
      }

      this.setState({
        newMarkerLocation: { longitude, latitude },
        isFormVisible: true,
        formData: {
          id: '',
          category: '',
          title: '',
          report: '',
          date: new Date().toISOString().split('T')[0],
          location: { latitude, longitude },
        },
      });

      console.log('New marker coordinates:', longitude, latitude);
    } else {
      console.error('Invalid coordinates:', coordinates);
      Alert.alert('Error', 'Failed to retrieve coordinates.');
    }
  };

  // Fungsi untuk menyimpan marker baru ke API
  saveNewMarker = async () => {
    const { formData, pengaduanData } = this.state;
  
    // Validasi input dan koordinat
    if (!formData.title || !formData.report || !formData.category) {
      Alert.alert('Error', 'Please fill all fields before saving.');
      return;
    }

    const latitude = parseFloat(formData.location.latitude);
    const longitude = parseFloat(formData.location.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      Alert.alert('Error', 'Invalid coordinates. Please check the location.');
      return;
    }

    const updatedFormData = { ...formData, location: { latitude, longitude } };

    try {
      const response = await fetch('http://192.168.8.101:3000/pengaduan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to save marker');
      }

      await this.fetchMarkers();  // Refresh markers
      this.setState({ isFormVisible: false, newMarkerLocation: null });
      Alert.alert('Success', 'Marker has been saved successfully!');
    } catch (error) {
      console.error('Error saving marker:', error);
      Alert.alert('Error', 'Failed to save marker.');
    }
  };

  // Inside your renderMarkers method, add onPress to the marker
  renderMarkers() {
    const { pengaduanData } = this.state;

    return pengaduanData.map((pengaduan) => {
      const longitude = parseFloat(pengaduan.longitude);
      const latitude = parseFloat(pengaduan.latitude);

      if (isNaN(longitude) || isNaN(latitude)) {
        console.warn(`Invalid coordinates for marker ID: ${pengaduan.id}`);
        return null; // Skip invalid markers
      }

      return (
        <MapLibreGL.PointAnnotation
          key={pengaduan.id}
          id={String(pengaduan.id)}
          coordinate={[longitude, latitude]}
          onPress={() => this.handleMarkerPress(pengaduan)} // Add onPress handler
        />
      );
    });
  }



  render() {
    const { isFormVisible, formData } = this.state;
    const { isMarkerDetailsVisible, DataView, userLocation } = this.state;

    return (
      <View style={styles.page}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL={`https://api.maptiler.com/maps/streets-v2/style.json?key=z52tCgMGETEry417QpMQ`}
          onPress={this.onMapPress}
        >
          <MapLibreGL.Camera zoomLevel={12} centerCoordinate={[106.982112, -6.234213]} />
          {/* Menambahkan marker geolokasi pengguna */}
          {userLocation && (
            <MapLibreGL.UserLocation
              visible={true}
              renderMode="normal"
              showHeadingIndicator={true}
              style={styles.userLocation}
            />
          )}

          {this.renderMarkers()}
        </MapLibreGL.MapView>

        {/* Form untuk input data marker */}
        <Modal visible={isFormVisible} animationType="slide" transparent>
  <View style={styles.modalContainer}>
    <View style={styles.card}>
      <Text style={styles.modalTitle}>Tambah Laporan Baru</Text>
      <TextInput
        style={styles.input}
        placeholder="Kategori"
        value={formData.category}
        onChangeText={(text) => this.setState({ formData: { ...formData, category: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Judul Laporan"
        value={formData.title}
        onChangeText={(text) => this.setState({ formData: { ...formData, title: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Isi Laporan"
        value={formData.report}
        onChangeText={(text) => this.setState({ formData: { ...formData, report: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={formData.location.latitude?.toString() || ''}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={formData.location.longitude?.toString() || ''}
        editable={false}
      />

      <TouchableOpacity style={styles.saveButton} onPress={this.saveNewMarker}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => this.setState({ isFormVisible: false })}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

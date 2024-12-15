import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClipboard, faTrash } from '@fortawesome/free-solid-svg-icons';

const Pengaduan = () => {
  const jsonUrl = 'http://192.168.8.101:3000/pengaduan';
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [report, setReport] = useState('');
  const [date, setDate] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataPengaduan, setDataPengaduan] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataPengaduan(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  const submit = () => {
    if (!selectedReport || !selectedReport.id) {
      alert('Pilih data untuk diedit.');
      return;
    }

    const data = {
      category,
      title,
      report,
      date,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };

    fetch(`${jsonUrl}/${selectedReport.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data pengaduan berhasil diperbarui');
        setCategory('');
        setTitle('');
        setReport('');
        setDate('');
        setLatitude('');
        setLongitude('');
        setSelectedReport(null);
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
        alert('Gagal memperbarui data pengaduan');
      });
  };

  const selectItem = (item) => {
    setSelectedReport(item);
    setCategory(item.category);
    setTitle(item.title);
    setReport(item.report);
    setDate(item.date);
    setLatitude(String(item.location.latitude));
    setLongitude(String(item.location.longitude));
  };

  // Function to delete data
  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        Alert.alert('Success', 'Data has been deleted.');
        // Refresh data after deletion
        setDataPengaduan(dataPengaduan.filter((item) => item.id !== id));
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to delete data.');
        console.error('Error deleting data:', error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView>
        <View>
          {isLoading ? (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={styles.cardtitle}>Loading...</Text>
            </View>
          ) : (
            <View>
              <View>
                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    placeholder="Kategori"
                    value={category}
                    onChangeText={(value) => setCategory(value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Judul"
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Laporan"
                    value={report}
                    onChangeText={(value) => setReport(value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Tanggal"
                    value={date}
                    onChangeText={(value) => setDate(value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    value={latitude}
                    onChangeText={(value) => setLatitude(value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    value={longitude}
                    onChangeText={(value) => setLongitude(value)}
                  />
                  <Button title="Edit" style={styles.button} onPress={submit} />
                </View>
              </View>
              <View style={styles.devider}></View>

              <FlatList
                style={{ marginBottom: 10 }}
                data={dataPengaduan}
                onRefresh={() => {
                  refreshPage();
                }}
                refreshing={refresh}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity onPress={() => selectItem(item)}>
                      <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <View style={styles.cardText}>
                            <Text style={styles.cardtitle}>{item.title}</Text>
                            <Text>{item.category}</Text>
                            <Text>{item.report}</Text>
                            <Text>{item.date}</Text>
                            <Text>{`Latitude: ${item.location.latitude}, Longitude: ${item.location.longitude}`}</Text>
                          </View>
                        </View>
                        {/* Delete Button */}
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() =>
                            Alert.alert('Hapus data', 'Yakin akan menghapus laporan ini?', [
                              { text: 'Tidak' },
                              { text: 'Ya', onPress: () => deleteData(item.id) },
                            ])
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} size={20} color="red" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Pengaduan;

const styles = StyleSheet.create({
  form: {
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
  },
  cardtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  cardContent: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    flex: 1,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

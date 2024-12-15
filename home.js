import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faNotesMedical,
  faFire,
  faVolcano,
  faUserNurse,
  faInfoCircle,
  faShield,
} from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button for Modal */}
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => setModalVisible(true)}
      >
        {/* Changed color to blue (#007bff) */}
        <FontAwesomeIcon icon={faInfoCircle} size={25} color="rgb(0, 37, 245)" />
      </TouchableOpacity>

      {/* City Illustration */}
      <Image
        source={require('./assets/City_New.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title Text */}
      <Text style={styles.title}>
        Selamat Datang di Aplikasi Layanan Pengaduan Masyarakat Kota Bekasi
      </Text>

      {/* Contact Information with Buttons and Icons */}
      <View style={styles.contactInfo}>
        {/* Health Emergency Service */}
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: '#28a745' }]} // Green for health
          onPress={() => Linking.openURL('tel:119')}
        >
          <FontAwesomeIcon
            icon={faUserNurse}
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.contactText}>Layanan Gawat Darurat Kesehatan</Text>
        </TouchableOpacity>
        
        {/* Health Emergency Service */}
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: 'rgb(197, 197, 52)' }]} // Green for health
          onPress={() => Linking.openURL('tel:0218842752')}
        >
          <FontAwesomeIcon
            icon={faShield}
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.contactText}>Layanan Keamanan </Text>
        </TouchableOpacity>

        {/* Fire Department */}
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: '#dc3545' }]} // Red for fire
          onPress={() => Linking.openURL('tel:02188957805')}
        >
          <FontAwesomeIcon
            icon={faFire}
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.contactText}>Layanan Pemadam Kebakaran</Text>
        </TouchableOpacity>

        {/* Disaster Management */}
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: '#fd7e14' }]} // Orange for disaster
          onPress={() => Linking.openURL('tel:+6281283957877')}
        >
          <FontAwesomeIcon
            icon={faVolcano}
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.contactText}>Layanan BPBD</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Apa itu BeCare??</Text>
            <Text style={styles.modalText}>
              BeCare (Bekasi Care) adalah aplikasi pengaduan yang memungkinkan masyarakat Kota Bekasi
              untuk melaporkan berbagai permasalahan yang mengganggu kenyamanan kota. Aplikasi ini
              dirancang untuk menampung pengaduan terkait masalah sosial, kesehatan, ekonomi, dan
              berbagai isu lainnya yang terjadi di Kota Bekasi.
            </Text>
            <Text style={styles.modalText}>
              Tujuan utama dari aplikasi ini adalah untuk membantu pemerintah Kota Bekasi dalam menangani
              dan menyelesaikan permasalahan yang dihadapi oleh warganya. Selain itu, BeCare dilengkapi
              dengan fitur GIS (Geographic Information System), yang memungkinkan laporan pengaduan
              ditampilkan dalam bentuk peta interaktif. Setiap pengaduan akan terhubung dengan titik lokasi
              yang mempermudah pemantauan dan penanganan oleh pihak berwenang.
            </Text>

            <Button
              title="Tutup"
              onPress={() => setModalVisible(false)}
              color="#28a745"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0faff', // Light blue background
  },
  modalButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
  image: {
    width: 300, // Adjust based on your image size
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contactInfo: {
    marginTop: 20,
    width: '100%',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // Add shadow effect
  },
  icon: {
    marginRight: 15, // Space between icon and text
  },
  contactText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
});

import React from 'react';  
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(() => {
      console.error('Failed to open URL:', url);
    });
  };

  return (
    <View style={styles.container}>

      {/* Gambar Ilustrasi */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/D5603AQE96Vn5Lee4Zw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1703853685681?e=1740009600&v=beta&t=HMxXzF6dlazPow5fcZ_PJOKKr7RLShWDXmvJWqaWhcM' }} // Ganti dengan URL gambar atau file lokal
          style={styles.image}
        />
      </View>

      {/* Informasi Pembuat */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Johanes Berchmann Juvens Junior Pareira</Text>
      
        {/* Deskripsi Pembuat */}
        <Text style={styles.description}>
          Seorang mahasiswa yang berfokus pada pengembangan teknologi informasi, khususnya dalam bidang
          sistem informasi geografis (SIG). Memiliki minat besar dalam pengembangan perangkat lunak
          dan pemrograman dengan tujuan untuk menciptakan solusi teknologi yang inovatif. Aplikasi ini 
          dikembangkan sebagai bagian dari proyek untuk mengasah keterampilan pengembangan aplikasi mobile 
          dengan React Native.
        </Text>
      </View>

      {/* Ikon Sosial */}
      <View style={styles.infoContainer}>
      <Text style={styles.name}>
          Follow My Social Media :
        </Text>
      <View style={styles.iconContainer}>
        {/* GitHub */}
        <TouchableOpacity onPress={() => openURL('https://github.com/Johappy07')}>
          <FontAwesomeIcon icon={faGithub} size={30} color="#333" />
        </TouchableOpacity>

        {/* LinkedIn */}
        <TouchableOpacity onPress={() => openURL('https://www.linkedin.com/in/johanesberchmann/')}>
          <FontAwesomeIcon icon={faLinkedin} size={30} color="#0e76a8" />
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity onPress={() => openURL('mailto:johanesberchmann@gmail.com')}>
          <FontAwesomeIcon icon={faEnvelope} size={30} color="#f44336" />
        </TouchableOpacity>

        {/* Telepon */}
        <TouchableOpacity onPress={() => openURL('tel:+6287884305715')}>
          <FontAwesomeIcon icon={faPhone} size={30} color="#4caf50" />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    width: '90%',
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  university: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
  },
});

export default ProfilePage;

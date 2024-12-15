import React, { useState, useEffect } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClipboard, faTrash } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://192.168.8.101:3000/pengaduan'; // API URL
  
  // State for storing data and form input
  const [data, setData] = useState([]);
  
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(jsonUrl);
        const result = await response.json();
        
        // Sort data by the latest date
        const sortedData = result.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setData(sortedData); // Update state with sorted data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to delete data
  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        Alert.alert('Success', 'Data has been deleted.');
        // Refresh data after deletion
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to delete data.');
        console.error('Error deleting data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <FontAwesomeIcon icon={faClipboard} size={60} color="#007bff" style={styles.icon} />
              <View style={styles.cardText}>
                <Text style={styles.category}>Kategori: {item.category}</Text>
                <Text style={styles.title}>Judul Laporan: {item.title}</Text>
                <Text style={styles.date}>Tanggal: {item.date}</Text>
              </View>
            </View>
            
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique 'id'
      />
    </View>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  deleteButton: {
    padding: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

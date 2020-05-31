import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '../Duda/node_modules/@react-navigation/native'

import styles from './style';
import logoImg from '../assets/logo.png';
import api from '../services/api';

export default function Home() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents() {
        if(loading == true) {
            return;
        }

        if(total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                data={incidents}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View>
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>
                            <Text style={styles.incidentProperty}>Caso:</Text>
                            <Text style={styles.incidentValue}>{incident.description}</Text>
                            <Text style={styles.incidentProperty}>Valor:</Text>
                            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                                style: 'currency', currency: 'BRL' }).format(incident.value)}
                            </Text>

                            <TouchableOpacity style={styles.detailsButton}
                                onPress={() => navigateToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color={'#e02041'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
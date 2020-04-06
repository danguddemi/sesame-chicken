import React, {memo, useEffect, useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import { Card, Title, Subheading} from 'react-native-paper';
import useGeoLocation from "../api/geo-location";
import useYelpApi from "../api/yelp-client";
import FilledBackButton from "../components/FilledBackButton";
import MapView, {Overlay} from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import Background from "../components/Background";

const RestaurantScreen = ({navigation}) => {
    const [location, errorMessage] = useGeoLocation();
    const [yelpBusiness, yelpRegion, fetchBusinesses] = useYelpApi();
    const mapRef = useRef(null);

    const updateRegion = (item) => {
        mapRef.current.animateToRegion({latitude: item.coords.latitude - 0.4 * 0.05, longitude: item.coords.longitude}, 100)
    };

    useEffect(() => {
        if (location !== null) {
            fetchBusinesses(location.coords.latitude - 0.4 * 0.05, location.coords.longitude, navigation.getParam('yelpLabels', null));
        }
    }, [location]);

    return (
        <View>
            {yelpRegion !== null ? <MapView
                style={{
                    width: '100%',
                    height: '100%'
                }}
                showsUserLocation={true}
                initialRegion={{...yelpRegion, latitudeDelta: 0.05, longitudeDelta: 0.05}}
                ref={mapRef}
            >
                {yelpBusiness.map((place, idx) => (
                    <MapView.Marker
                        key={idx}
                        title={place.name}
                        coordinate={place.coords}
                    />))}
            </MapView> : <Background/>}
            <FilledBackButton goBack={() => navigation.navigate('Dashboard')}/>
            <View style={styles.actionArea}>
                <View style={styles.cardContainer}>
                    <Carousel
                        data={yelpBusiness}
                        sliderWidth={375}
                        itemWidth={300}
                        layout={'default'}
                        onBeforeSnapToItem={idx => updateRegion(yelpBusiness[idx])}
                        renderItem={({item, index}) => (
                            <Card key={index} style={styles.businessCard}>
                                <Card.Cover
                                    style={{width: 300, height: 300}}
                                    source={{uri: item.imageUrl}}
                                />
                                <Card.Content>
                                    <Title>{item.name}</Title>
                                    <Subheading>{item.address}</Subheading>
                                </Card.Content>
                            </Card>
                        )}
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    actionArea: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 50
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center'
    },
    businessCard: {
        height: 400,
        width: 300
    }
});

export default memo(RestaurantScreen);

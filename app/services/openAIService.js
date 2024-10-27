// services/openAIService.js
const fetch = require('node-fetch');
const { getDB } = require('../config/db');
const api_IP = '127.0.0.1:5000';

// POST 요청을 보내는 함수
const openAI_api = async (url, data) => {
    const db = getDB();
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};



// OpenAI 이미지 처리 함수
const openAI_IMG = async (userId, foodimage) => {
    const db = getDB();
    let userAllergies = null;
    try {
        const userCollection = db.collection('user');
        const userInformation = await userCollection.findOne({ userId: userId });
        const trueFields = Object.keys(userInformation).filter(
            (key) => userInformation[key] === true
        );
        userAllergies = trueFields.join(' ');
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
    const dataToSend = {
        allergy: userAllergies,
        imgB64: foodimage,
    };
    const apiUrl = `http://${api_IP}/openAI/img`;
    const respond = await openAI_api(apiUrl, dataToSend);
    console.log(respond);
    const result = JSON.parse(respond);
    return result;
};

const openAI_detail = async (userId, foodimage) => {
    const db = getDB();
    let userAllergies = null;
    try {
        const userCollection = db.collection('user');
        const userInformation = await userCollection.findOne({ userId: userId });
        const trueFields = Object.keys(userInformation).filter(
            (key) => userInformation[key] === true
        );
        userAllergies = trueFields.join(' ');
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
    const dataToSend = {
        allergy: userAllergies,
        foodName:foodName,
        imgB64: foodimage,
    };
    const apiUrl = `http://${api_IP}/openAI/img/detail`;
    const respond = await openAI_api(apiUrl, dataToSend);
    console.log(respond);
    const result = JSON.parse(respond);
    return result;
};

// OpenAI 텍스트 처리 함수
const openAI_SAY = async (userId, food) => {
    const db = getDB();
    let userAllergies = null;
    try {
        const userCollection = db.collection('user');
        const userInformation = await userCollection.findOne({ userId: userId });
        const trueFields = Object.keys(userInformation).filter(
            (key) => userInformation[key] === true
        );
        userAllergies = trueFields.join(' ');
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
    const dataToSend = {
        allergy: userAllergies,
        food: food,
    };
    const apiUrl = `http://${api_IP}/openAI/say`;
    const respond = await openAI_api(apiUrl, dataToSend);
    const result = JSON.parse(respond);
    return result;
};

module.exports = {
    openAI_api,
    openAI_IMG,
    openAI_SAY,
    openAI_detail,
};

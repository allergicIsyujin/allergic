// image
const { getDB } = require('../config/db');
const { openAI_IMG } = require('../services/openAIService');
let Result=0;
let imageUrl_2;

// Base64 이미지 데이터 처리 엔드포인트
const processBase64Image = async (req, res) => {
    const { userid, food, imageUrl } = req.body;
    if (!userid || !food) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    console.log(`Received image from user: ${userid}`);

    try {
        Result = await openAI_IMG(userid, food);
        console.log(Result);
        imageUrl_2=imageUrl;
        res.json( {result:Result} );
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }

};

const foodDetail = async (req, res) => {
    const { userid, food, imageUrl,foodName } = req.body;
    if (!userid || !food) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    console.log(`Received image from user: ${userid}`);

    try {
        Result = await foodDetail(userid, food,foodName);
        console.log(Result);
        imageUrl_2=imageUrl;
        res.json( {result:Result} );
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }

};

// 이미지 저장 엔드포인트
const saveImage = async (req, res) => {
    const db = getDB(); //DB인스턴스 만들어주기

    const userId = req.query.userId;
    const today=req.query.today;
    try {
        let image = await db.collection('image').insertOne({
            userId: userId,
            food: imageUrl_2,
        });
        console.log(image.insertedId);
        await db.collection('record').insertOne({
            _id: image.insertedId,
            today:today,
            ok: Result.ok,
            foodName: Result.foodName,
            ingredient: Result.ingredients,
            notIngredients: Result.notIngredients,
            calo:Result.calo,
        });
        res.json({ message: 'success' });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ error: 'Error saving image' });
    }
};

module.exports = {
    processBase64Image,
    saveImage,
    foodDetail,
};

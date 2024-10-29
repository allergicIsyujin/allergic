// food
const { getDB } = require('../config/db');

// 음식 기록 조회 엔드포인트
const getFoodRecord = async (req, res) => {
    const db = getDB(); // DB인스턴스 만들어주기
    const userId = req.query.userid;
    try {
        const cursor = await db.collection('image').find({ userId: userId });
        const documents = await cursor.toArray();
        let responseArray = [];

        for (let i = 0; i < documents.length; i++) {
            let record = await db.collection('record').findOne({ _id: documents[i]._id });
            console.log("현호바보")
            console.log(record.foodName);
            responseArray.push({
                foodName: record.foodName,
                backgroundColor: record.ok === 'O' ? 1 : 0,
                image: documents[i].food,
                description: record.ingredient,
                ingredient: record.notIngredients,
                today:record.today,
                calo:record.calo
            });
        }
        console.log(responseArray);
        res.json(responseArray);
    } catch (error) {
        console.error('Error fetching food records:', error);
        res.status(500).json({ error: 'Error fetching food records' });
    }
};

module.exports = {
    getFoodRecord,
};

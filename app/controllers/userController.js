//user
const { getDB } = require('../config/db');
console.log(1)
// 로그인 엔드포인트
const login = async (req, res) => {
    const db = getDB();//db 인스턴스
    const userId = req.query.userid;
    const userPs = req.query.userpassword;
    let user = await db.collection('user').findOne({ userId: userId });
    if (!user) {
        res.json({ message: '아이디없음' });
    } else {
        if (user.userPs === userPs) {
            res.json({ userId: userId, userPs: userPs });
        } else {
            res.json({ message: '비밀번호 틀림' });
        }
    }
};

// 아이디 중복 확인 엔드포인트
const checkDuplication = async (req, res) => {
    const db = getDB();//db 인스턴스
    const userId = req.query.userId;
    console.log(userId);
    let user = await db.collection('user').findOne({ userId: userId });
    if (user) {
        res.json({ message: '아이디가 중복입니다.' });
    } else {
        res.json({ message: '아이디 사용가능합니다.' });
    }
};

// 회원가입 엔드포인트
const signup = async (req, res) => {
    const db = getDB();//db 인스턴스
    console.log(req.body);
    const userId = req.query.userId;
    const userPs = req.query.userPs;
    const userRPs = req.query.userRPs;
    let user = await db.collection('user').findOne({ userId: userId });
    if (user) {
        res.json({ message: '아이디가 중복입니다.' });
    } else {
        if (userPs === userRPs) {
            db.collection('user').insertOne({
                userId: userId,
                userPs: userPs,
                계란: false,
                밀: false,
                우유: false,
                닭고기: false,
                돼지고기: false,
                견과류: false,
                새우: false,
                오징어: false,
                고등어: false,
                게: false,
                조개: false,
                복숭아: false,
            });
            res.json({ userId: userId });
        } else {
            res.json({ message: '비밀번호가 일치하지 않습니다.' });
        }
    }
};

module.exports = {
    login,
    checkDuplication,
    signup,
};

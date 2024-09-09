const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authmidleware = (req, res, next) => {
    
// Lấy token từ headers
    const token = req.headers.token.split(' ')[1]; // Phải là 'Bearer <token>'

    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'error'
            });
        }

      //  const { payload } = user;

        // Kiểm tra quyền admin
        if (user?.isAdmin) {
           // req.user = payload; // Lưu thông tin user vào request để sử dụng sau này
            next();
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'error'
            });
        }
    });
}

const authUsermidleware = (req, res, next) => {
    /*const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authentication token is missing or malformed',
            status: 'error'
        });
    }*/

    // Lấy token từ headers
    const userId = req.params.id; // Lấy userId từ URL parameters

    const token = req.headers.token.split(' ')[1]; // 'Bearer <token>'

    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({
                message: 'Authentication failed',
                status: 'error'
            });
        }

        console.log('User ID from token:', user.id);
        console.log('User ID from params:', userId);

        // Kiểm tra quyền admin hoặc id người dùng
        if (user?.isAdmin || user?.id === userId) {
            req.user = user; // Lưu thông tin user vào request để sử dụng sau này
            next();
        } else {
            return res.status(403).json({
                message: 'Admin privileges or matching user ID required',
                status: 'error'
            });
        }
    });
}

module.exports = {
    authmidleware,
    authUsermidleware
}

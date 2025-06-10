// middlewares/formDataParser.js
import multer from 'multer';

// Middleware for parsing non-file form-data
const parseFormData = multer().none();
export default parseFormData;
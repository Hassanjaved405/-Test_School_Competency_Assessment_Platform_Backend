import mongoose from 'mongoose';
import { IQuestion } from '../types';
declare const Question: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Question;
//# sourceMappingURL=Question.model.d.ts.map
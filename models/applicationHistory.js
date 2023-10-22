import mongoose from 'mongoose';

const applicationHistory = new mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: 'Job._id',
        required: [true, `Job Ref cannot be empty`]
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User.Id',
        required: [true, `User Ref cannot be empty`]
    },
    applicationStatus: {
        type: String,
        enum: ['Applied', 'In-Review', 'Closed', 'Offered'],
        default: 'Applied'
    }
},
    {
        timestamps: true
    }
);

applicationHistory.index({ jobId: 1, user: 1 }, { unique: true });

export default mongoose.model(`ApplicationHistory`, applicationHistory);

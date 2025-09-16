import imagekit from '../configs/imageKit.js';
import Story from '../models/Story.js';
import User from '../models/User.js';
import { inngest } from '../inngest/index.js';

// ADD USER STORY
export const addUserStory = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { content, media_type, background_color } = req.body;
        const media = req.file;
        let media_url = '';

        // UPLOAD MEDIA TO IMAGEKIT
        if (media && (media_type === 'image' || media_type === 'video')) {
            const response = await imagekit.upload({
                file: media.buffer,
                fileName: media.originalname,
            });
            media_url = response.url;
        }


        // CREATE STORY
        // CREATE STORY
        const story = await Story.create({
            user: userId,
            content,
            media_url,
            background_color,
        });


        // SCHEDULE STORY DELETION (only in production)
        if (process.env.NODE_ENV === 'production') {
            await inngest.send({
                name: 'app/story.delete',
                data: { storyId: story._id },
            });
        } else {
            console.log(`Skipping inngest.send in dev. StoryId: ${story._id}`);
        }

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// GET USER STORIES
export const getStories = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findById(userId);

        // user connections and following
        const userIds = [userId, ...user.connections, ...user.following];
        const stories = await Story.find({
            user: { $in: userIds },
        })
            .populate('user')
            .sort({ createdAt: -1 });

        res.json({ success: true, stories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

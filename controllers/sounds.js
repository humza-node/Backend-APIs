const Sound=require('../models/sounds');
exports.getAddMusic = async (req, res, next) =>
{
    const soundName = req.body.soundName;
    const soundtype = req.body.soundtype;
    const soundduration = req.body.soundduration;
    const soundUrl = req.body.soundUrl;
    const sounds = new Sound(
        {
          soundName: soundName,
          soundtype: soundtype,
          soundduration: soundduration,
          soundUrl: soundUrl  
        }
    );
    const result = await sounds.save();
    res.status(200).json({message: "Music Created", result});
};
exports.getMusic = async (req, res, next) =>
{
const results = await Sound.find();
res.status(200).json({message: "Fetch Music", results});
};
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
exports.UpdateMusic = async (req, res, next) =>
{
  const soundId = req.params.soundId;
  const soundName = req.body.soundName;
  const soundtype = req.body.soundtype;
  const soundduration = req.body.soundduration;
  const soundUrl = req.body.soundUrl;
  Sound.findById(soundId).then(sounds =>
    {
      if(!sounds)
      {
        const error = new Error("Sound Not Exist");
        error.statusCode = 404;
        throw error;
      }
      sounds.soundName = soundName;
      sounds.soundtype = soundtype;
      sounds.soundduration = soundduration;
      sounds.soundUrl = soundUrl;
     return sounds.save();
    }).then(results =>
      {
        res.status(200).json({message: "Sound Update", results});
      }).catch(err =>
        {
          if(!err.statusCode)
          {
            err.statusCode=500;
          }
          next(err);
        });
};
exports.DeleteMusic = async (req, res, next) =>
{
  const soundId = req.params.soundId;
  Sound.findById(soundId).then(sounds =>
    {
      if(!sounds)
      {
        const error = new Error('Sound Not Founds');
        error.statusCode = 404;
        throw error;
      }
      return Sound.findByIdAndDelete(soundId);
    }).then(results =>
      {
        res.status(200).json({message: "Sounds", results});
      }).catch(err =>
        {
          if(!err.statusCode)
          {
            err.statusCode=500;
          }
          next(err);
        });
};
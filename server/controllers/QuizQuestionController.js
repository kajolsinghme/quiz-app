const Question = require('../models/questionModel')

exports.getQuizQuestion = async(req,res) => {
    try{
        const numberOfQuestions = 10;
        const quizQuestions = await Question.aggregate([
            { $sample: { size: numberOfQuestions } }
        ])
        return res.json(quizQuestions)
    }
    catch(error){
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.addQuizQuestion = async(req,res) => {
    try{
        const {questions} = req.body

        let errorfulQues=[], toBeInserted=[]

        if (!questions || !Array.isArray(questions)){
            return res.status(400).json({error:"Missing required fields"})
        }

        for (const indx in questions){
            const {desc, options, correctAnswer} = questions[indx]

            if(!desc || !options || typeof correctAnswer !== "number" || correctAnswer<0){
                console.error("Validation error in", questions[indx])
                errorfulQues.push(questions[indx].desc)
                continue
            }
            toBeInserted.push(questions[indx])
        
        }

        await Question.insertMany(toBeInserted)

        return res.status(201).json({ error:null, errorfulQues})
        
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
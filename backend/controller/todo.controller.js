import Todo from '../model/todo.model.js'
export const createTodo = async(req, res)=>{
    const todo = new Todo({
        text:req.body.text,
        completed:req.body.completed,
        user:req.user._id
    })

    try {
        const newTodo =await todo.save()
        res.status(201).json({message:"Todo created successfully", newTodo})
    } catch (error) {
        console.log("Error while creating todo",error);
        
    }
}

export const getTodo = async(req, res)=>{
    try {
        const todos = await Todo.find({ user:req.user._id})
        res.status(201).json({message:"Todo fetched successfully", todos})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error while fetching todos"})
    }
}

export const updateTodo = async(req, res)=>{
   try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(201).json({message:"todo updated successfully",todo})
   } catch (error) {
    console.log(error);
    res.status(400).json({message:"Error while updating todos"})
    
   }
}
export const deleteTodo = async(req, res)=>{
   try {
    await Todo.findByIdAndDelete(req.params.id)
    res.status(201).json({message:"todo deleted successfully"})
   } catch (error) {
    console.log(error);
    res.status(400).json({message:"Error while deleting todos"})
    
   }
}


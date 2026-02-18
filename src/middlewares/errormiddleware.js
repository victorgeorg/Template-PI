export function errorMiddleware(err,req,res,next) {
    const status = err.statusCode || 500
    console.error(err.message)
    res.status(status).json({message:'Algo deu errado,tente novamente mais tarde.'})
}
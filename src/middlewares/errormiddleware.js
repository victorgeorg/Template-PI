export function errorMiddleware(err,req,res,next) {
    const status = err.statusCode || 500
    const isOperational = err.isOperational || false
    
    res.status(status).json({message: isOperational ? err.message : 'Erro inesperado.Tente novamente mais tarde.'})
}
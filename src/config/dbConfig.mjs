import mongoose from 'mongoose';
import dns from 'node:dns';

//Profe, aguegué esto consultando a la IA porque no lograba conectarme a MongoDB. En el práctico anterior tuve el mismo problema y un compañero me pasó el bloque de DNS que habían resuelto con el profe Augusto en las salas de Zoom. Como yo no había estado en esa clase, lo pedí y tuve suerte gracias a la amabilidad de mi compañero.
dns.setServers(['1.1.1.1', '8.8.8.8']);

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://grupo-06:grupo-06@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}



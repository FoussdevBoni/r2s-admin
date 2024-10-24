// pages/api/ecoles.js

import connectToDatabase from '@/lib/mongodb';
import Ecole from '@/models/Ecole';
import bcrypt from 'bcrypt';

export async function GET(req) {
  await connectToDatabase();
  
  try {
    const ecoles = await Ecole.find();
    return new Response(JSON.stringify(ecoles), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'Erreur lors de la récupération des écoles', error }), { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();
  
  try {
    const body = await req.json();

    // Vérification de l'existence de l'école par email
    const existingEcole = await Ecole.findOne({ emailEcole: body.emailEcole });
    if (existingEcole) {
      return new Response(JSON.stringify({ message: 'L\'école existe déjà' }), { status: 400 });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const ecole = new Ecole({
      ...body,
      password: hashedPassword,
    });

    const savedEcole = await ecole.save();
    return new Response(JSON.stringify(savedEcole), { status: 201 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Erreur lors de la création de l\'école', error }), { status: 400 });
  }
}

export async function PUT(req) {
  await connectToDatabase();
  
  const { id } = req.params;
  const body = await req.json();

  try {
    const updatedEcole = await Ecole.findByIdAndUpdate(id, body, { new: true });
    if (!updatedEcole) {
      return new Response(JSON.stringify({ message: 'École non trouvée' }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedEcole), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur lors de la mise à jour de l\'école', error }), { status: 400 });
  }
}

export async function DELETE(req) {
  await connectToDatabase();
  
  const { id } = req.params;

  try {
    const deletedEcole = await Ecole.findByIdAndDelete(id);
    if (!deletedEcole) {
      return new Response(JSON.stringify({ message: 'École non trouvée' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'École supprimée avec succès' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur lors de la suppression de l\'école', error }), { status: 500 });
  }
}

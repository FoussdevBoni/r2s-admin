// pages/api/flottes.js

import connectToDatabase from '@/lib/mongodb';
import Flotte from '@/models/Flotte';
import bcrypt from 'bcrypt';

export async function GET(req) {
  await connectToDatabase();
  
  try {
    const flottes = await Flotte.find();
    return new Response(JSON.stringify(flottes), { status: 200 });
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
    const existingFlotte = await Flotte.findOne({ managerEmail: body.managerEmail });
    if (existingFlotte) {
      return new Response(JSON.stringify({ message: 'L\'école existe déjà' }), { status: 400 });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const flotte = new Flotte({
      ...body,
      password: hashedPassword,
    });

    const savedFlotte = await flotte.save();
    return new Response(JSON.stringify(savedFlotte), { status: 201 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Erreur lors de la création de la flotte', error }), { status: 400 });
  }
}

export async function PUT(req) {
  await connectToDatabase();
  
  const { id } = req.params;
  const body = await req.json();

  try {
    const updatedFlotte = await Flotte.findByIdAndUpdate(id, body, { new: true });
    if (!updatedFlotte) {
      return new Response(JSON.stringify({ message: 'Flotte non trouvée' }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedFlotte), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur lors de la mise à jour de l\'école', error }), { status: 400 });
  }
}

export async function DELETE(req) {
  await connectToDatabase();
  
  const { id } = req.params;

  try {
    const deletedFlotte = await Flotte.findByIdAndDelete(id);
    if (!deletedFlotte) {
      return new Response(JSON.stringify({ message: 'Flotte non trouvée' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Flotte supprimée avec succès' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur lors de la suppression de l\'école', error }), { status: 500 });
  }
}

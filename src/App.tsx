import { useState} from 'react'
import './App.css'
import Header from './components/Header'
import { CardMedia, Card,  Box, Button , CardContent , Container } from '@mui/material';
import { useFetchApi } from './customHooks/useFetchApi'


function App() {

const pokemon = 'mudkip';
const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;


const { data: pokemonResult, isLoading: loading,  error: apiError } = useFetchApi(
  url,  {}, 'GET', [] );

  if (loading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (apiError) { 
    console.log('Error', apiError);
    return (
      <div className="App">
        <h1> {apiError ? 'Error Retrieving API Results' :  null }</h1>
      </div>
    );
  }

  return (
    <>
    <Header/>
   
  

    <Container >
   
 
    {!pokemonResult ? null : 
    <Card
      sx={{
        width: 343,
        maxWidth: "100%",
        borderRadius: "12px",
        padding: 1.5,
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      }}
    >
    
      <CardMedia
    component="img"
      height="200"
      image={pokemonResult.sprites.back_default} 
      alt="Pokemon Image"
  
      />
      <CardContent>
    <h1>{pokemonResult.name}</h1>
    <h1>{pokemonResult.id}</h1>
         
      </CardContent>
    </Card>}

    </Container>

    </>
  )
}

export default App

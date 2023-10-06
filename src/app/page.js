'use client'
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar'

const MyComponent = ({ album }) => {
  return (
    <div className="max-w-md w-64 h-96 flex flex-col justify-center items-center rounded overflow-hidden shadow-lg bg-white">
      <img
        src={album.image.find((img) => img.size === 'extralarge')['#text']}
        alt="Capa do Álbum"
        className="w-full h-64 object-cover"
      />
      <div className="px-2 py-2 text-center">
        <div className="font-bold text-sm mb-2 text-black line-clamp-1">{album.name}</div>
        <p className="text-gray-700 text-base truncate overflow-hidden max-h-40">
          Artista: {album.artist.name}
        </p>
        <p className="text-gray-700 text-base truncate overflow-hidden max-h-40">
          Playcount: {album.playcount}
        </p>
        <a
          href={album.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Link para o Álbum
        </a>
      </div>
    </div>
  );
};

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // URL do JSON
    const url =
      'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=taylorswift&api_key=a06476f4abcca5fd9fa6bc74b046e159&format=json'; // Substitua pela URL real do JSON

    // Faz a requisição HTTP usando fetch
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Os dados do JSON estão agora na variável 'data'
        // Vamos acessar a lista de álbuns
        const albumList = data.topalbums.album;
        setAlbums(albumList);
      })
      .catch((error) => {
        console.error('Erro ao buscar o JSON:', error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto flex flex-wrap justify-center">
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <div key={index} className="m-4">
              <MyComponent album={album} />
            </div>
          ))
        ) : (
          <p>Carregando dados dos álbuns...</p>
        )}
      </div>
    </div>
  );
};

export default AlbumList;

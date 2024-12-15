import { useCallback, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import './App.css';

function App() {

  const ACCSESS_KEY = 'V5Y3URsTugWZrdsdaiY3ODCn64ZrdoMvHybBYLfgabw'
  const BASE_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCSESS_KEY}&count=5`

  const [photos, setPhotos] = useState([])

  const getPhotos = useCallback(async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    setPhotos((prevState)=>[...prevState, ...data])
  }, [setPhotos])

  useEffect(() => {
    getPhotos().catch(console.error)
  }, [getPhotos])


  return (
    <div style={{width: "100vw", height: "90vh", textAlign: "center"}}>
      <h1>React Inifinite Scroll Virtuoso</h1>
      <Virtuoso
        data={photos}
        endReached={getPhotos}
        overscan={200}
        itemContent={(index, photo)=>{
          return <img key={index} src={photo.urls.small} alt={`Photo ${index}`} />
        }}
      />
    </div>
  );
}

export default App;
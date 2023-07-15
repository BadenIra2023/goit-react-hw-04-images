import { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImgs } from "./api";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import {Modal} from "./Modal/Modal";
import Notiflix from 'notiflix';


export const App = () =>  {
/*  state = {
  images: [],
  query: "",
  page: 1,
  error: null,
  totalPage: 0,
  notFound: false,
  isLoading: false,
  imageInModal: null,
  }*/
const [images, setImages] = useState([]);
const [query, setGuery] = useState("");
const [page, setPage] = useState(1);
const [error, setError] = useState(null);
const [totalPage, setTotalPage] = useState(0);
const [notFound, setNotFound] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [imageInModal, setImageInModal] = useState(0);

  
const onSubmit = query => {
    setImages([]);
    setGuery(query);
    setPage(1);
   };
  
  useEffect(() => {
    const getImages = async () => {
     if (query === "") { return; }
    setNotFound(false); 
    setError(null);
    setIsLoading(true);
    try {
        const response = await fetchImgs(query, page)
      const apiImages = response.hits;
      
        setImages(prevState => [...prevState, ...apiImages]);
      /* console.log(images) */
      setNotFound(false);
    const imagesQuantity = response.totalHits
        setImageIn(imagesQuantity)
   /*   console.log(imagesQuantity) */
      if (imagesQuantity === 0 || notFound) {
         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;};
        if (page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${imagesQuantity} images.`);
          const www = Math.ceil(imagesQuantity / 12)
          setTotalPage(www);
         };
      if (page < totalPage) {
        Notiflix.Notify.success(`Hooray! We found ${imagesQuantity} images. Still available for viewing ${imagesQuantity-12*page}`)
      }
      if (page === totalPage){
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      ); } }
    catch (error) {
      Notiflix.Notify.failure("Something went wrong. Please try again.");
      setError(error); console.log(error)}
    finally {
      setIsLoading(false);
    };
    }
    getImages();
  }, [query, page, notFound, totalPage]);
  const nextPage = () => {
    setPage(page + 1);
  /*  console.log(page) */
  };
  const onOpenModal = event => {
    const imageInModale = event.target.dataset.url;
    setImageInModal(imageInModale);
  };
  
  const onCloseModal = () => {
    setImageInModal(null);
 }
  const [imageIn, setImageIn] = useState(0);
  

  /*
   const {
      images,
      page,
      error,
      isLoading,
      imageInModal,
      imagesQuantity,
    } = this.state; */
  return (
    <div
  style={{
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  paddingBottom: '24px'
}}
    >
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {<ImageGallery images={images} openModal={onOpenModal} />}
      {page < imageIn / 12 && !isLoading && !error && (
        <Button nextPage={nextPage} />)}
      {imageInModal && (
          <Modal url={imageInModal} closeModal={onCloseModal} />
        )}
    </div>
  );
  };
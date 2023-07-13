import { Searchbar } from "./Searchbar/Searchbar";
import { Component } from "react";
import { fetchImgs } from "./api";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import {Modal} from "./Modal/Modal";
import Notiflix from 'notiflix';


export class App extends Component {
  state = {
  images: [],
  query: "",
  page: 1,
  error: null,
  totalPage: 0,
  notFound: false,
  isLoading: false,
  imageInModal: null,
  }
 onSubmit = query => {
    this.setState({
      images: [],
      query,
      page: 1,
    });
  };
  
  

  async componentDidUpdate(prevProps, prevState) {
    const {query, page}  = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      await this.getImages(query, page);
    }}
   getImages = async (query, page) => {
    if (!query) { return }
    this.setState({ loading: true });
    try {
        const response = await fetchImgs(query, page)
        const apiImages = response.hits;
        this.setState(prevState => ({
        images: [...prevState.images, ...apiImages],
        notFound: false,
        imagesQuantity: response.totalHits,
        }));
      const imagesQuantity = response.totalHits
         if (imagesQuantity === 0) {
         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;};
        if (page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${imagesQuantity} images.`);
          this.setState({totalPage: Math.ceil(imagesQuantity / 12),});
         };
      if (page < this.state.totalPage) {
        Notiflix.Notify.success(`Hooray! We found ${imagesQuantity} images. Still available for viewing ${imagesQuantity-12*page}`)
      }
      if (page === this.state.totalPage){
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      ); } }
    catch (error) {
      Notiflix.Notify.failure("Something went wrong. Please try again.");
      this.setState({
        error: error
      }); console.log(error.message)}
    finally {
      this.setState({
      isLoading: false,
      });
    }
  }
  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onOpenModal = event => {
    const imageInModal = event.target.dataset.url;
    this.setState({ imageInModal: imageInModal });
  };
  
  onCloseModal = () => {
    this.setState({ imageInModal: null });
 }

  
  render() {
   const {
      images,
      page,
      error,
      isLoading,
      imageInModal,
      imagesQuantity,
    } = this.state;
  return (
    <div
  style={{
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  paddingBottom: '24px'
}}
    >
      <Searchbar onSubmit={this.onSubmit} />
      {isLoading && <Loader />}
      {<ImageGallery images={images} openModal={this.onOpenModal} />}
      {page < imagesQuantity / 12 && !isLoading && !error && (
        <Button nextPage={this.nextPage} />)}
      {imageInModal && (
          <Modal url={imageInModal} closeModal={this.onCloseModal} />
        )}
    </div>
  );
  };
   }

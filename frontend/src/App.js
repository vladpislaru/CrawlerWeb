import {
  useDisclosure,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Checkbox,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,  
  List,
  ListItem,
  ListIcon,
  UnorderedList,
  ChakraProvider,
  Center,
  Heading 
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes, FaUser, FaUsers, FaPlus, FaList, FaSpider } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'

import { useRef, useState, useContext, useEffect } from 'react'

import LoginNav from "./components/Navs/loginNav";
import AuthSession from "./Utils/AuthSession";
import axios from './Utils/axios_main'
import Loading from "./components/Utils/Loading";
import SignUpForm from './components/Utils/SignUpForm';
import SignInForm from './components/Utils/SignInForm';
import "./App.css"

import AzureAwsGcp from "./static/mainbg.jpg"


import Geocode from "react-geocode";

const center = { latitude: 44.434951972403574, longitude: 26.047760546207428 }
const libs = ['places'];

function App() {

  const {auth, setAuth, currentPage, setCurrentPage} = useContext(AuthSession);
  const [page, setPage] = useState(0);

  useEffect( function(){
    setCurrentPage(currentPage);


  },[])

  return (
    <div className="App">
      {page == 0 ? <SignUpForm setPage={setPage}/> : ( page == 1 ? <SignInForm setPage={setPage}/> : <Home setPage={setPage}/>) }
    </div>
  )
}



function Home(props) {

  const { isLoaded } = useJsApiLoader({
    version: 'weekly',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libs,
  })

  const {auth, setAuth, currentPage, setCurrentPage} = useContext(AuthSession);

  const [links, setLinks] = useState([]);
  const [webSite, setWebSite] = useState("");
  const [isCrawling, setIsCrawling] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(async function(){
    
    try{
      console.log(auth.token)
      const response = await axios.get('/links', 
        {
          headers: {
            'Content-Type': 'application/json',
            'token': auth.token
          },
        }
        
      )

      //const data = await response.json();
      setLinks(response.data.links);

      console.log(response);
      
    }catch (err){
      console.log(err)

      if(!err?.response)
        console.log(err?.response)
      
    }
  },[]);

  const onCrawl = async () => {
    setIsCrawling(true);
    const res = await axios.post('/links/crawl', 
        JSON.stringify({
          webSite
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'token': auth.token
          },
          //withCredentials: true
        }
        
      )

    setLinks(res.data.links)
    setIsCrawling(false);

  }

  return (
    <Center height="100vh" bg="#dff9fb">
      
      <Box
        height="300px"
        width="600px"
        position="relative"
        role="group"
        cursor="pointer"
      >
        
        <Box
          
          transform=" rotateY(20deg) "
          transition="all 300ms ease-out"
          left={10}

          position="absolute"
          height="300px"
          width="500px"
          borderRadius={20}
          overflow="hidden"
          backgroundImage="url(https://static.dribbble.com/users/285475/screenshots/4720919/channel_surfing.gif)"
          backgroundPosition="center"
          shadow="xl"
        />
        <Box
          
          transform=" rotateY(20deg) "
          transition="all 300ms ease-out"
          position="absolute"
          left={10}
          height="300px"
          width="500px"
          p={4}
          opacity={0.8}
          style={{
            backdropFilter: "blur(10px) contrast(200%)"
          }}
          borderRadius={20}
          backgroundImage="linear-gradient(to top, #dfe6e9 0%, white 100%)"
          shadow="sm"
        >
          <IconButton 
            icon={<FaList/>}
            float={"right"}
            title='Your paper links'
            onClick={onOpen}
          >
          </IconButton>
          <Heading>
            Let's crawl!
          </Heading>
          <FormControl margin={3}>
            <FormLabel>Web stie</FormLabel>
            <Input type='text' value={webSite}  onChange={(e) => {setWebSite(e.target.value)}}/>
            <FormHelperText>We'll never share your data</FormHelperText>
            <Button 
              onClick={onCrawl}
              marginTop={5} 
              rightIcon={<FaSpider color='black'/>} 
              colorScheme='grey' 
              variant='outline'
              isLoading = {isCrawling ? true : false}
              loadingText='Crawling'>
              Crawl
            </Button>
          </FormControl>
        </Box>
      </Box>


      <Modal
        
        isOpen={isOpen}
        onClose={onClose}
        position='absolute'
        left="25px"
        motionPreset='slideInRight'
        variant=''
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ auth.name ? `${auth.name} links` : "No links yet"  }</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          
            <UnorderedList>
              { links.map((link,index) => {
                    return <ListItem key={link.id}><a href={"https://" + link.link}>{link.count} - {link.name}</a></ListItem>
                }) }
            </UnorderedList>
    
          </ModalBody>
          
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        
          
        </ModalContent>
      </Modal>
    </Center>
  )
}










export default App

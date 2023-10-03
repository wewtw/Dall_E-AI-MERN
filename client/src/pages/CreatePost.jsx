import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', prompt: '', photo: '', });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    
    //call backend rroutes  costss 1024×1024	$0.020 / image
    const generateImage = async () => {
      if (form.prompt && form.name) {
        try {
          setGeneratingImg(true);
          const response = await fetch('http://localhost:8080/api/v1/dalle', {
          //optionn  
          method: 'POST',
            //haeders object 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: form.prompt,
              name: form.name,
            }),
          });
          //parse the data 
          const data = await response.json();
          //save and render img
          setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        } 
        //handle errors
        catch (err) {
          alert(err);
        } finally {
          setGeneratingImg(false);
        }
      } else {
        if (!form.prompt) {
          alert('Please provide proper prompt');
        }
        if (!form.name) {
          alert('Please provide proper name');
        }
      }
    };
    
    const handleSubmit = async(e) => {
        ///share button event
        e.preventDefault();
        
        //if prompt and photo is true than load is set to true
        if(form.prompt && form.photo){
          setLoading(true);

          try {
            const response = await fetch('http://localhost:8080/api/v1/post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...form }),///sending to backend body const
            });
            
            ///if response is good back to homepage
            await response.json();
            alert('Success');
            navigate('/');
          } catch (err) {
            alert(err);
          } finally {
            setLoading(false);
          }
        } else {
          alert('Please generate an image with proper details');
        }
    }
    const handleChange = (e) => {
        ///
        setForm({...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        //prompt 
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({...form, prompt: randomPrompt})
    }
    // expand image click
    const [expandedImage, setExpandedImage] = useState(false);



    return (

        <section className='max-w-7x1 mx-auto'>
            <div>


                <h1 className='font-exttrabold text-black text-[32px]'>Create Image</h1>


                <p className='mt-1 text-gray-500 text-[15px] max-w[500px]'>Create images with generative DALL-E AI.</p>



            </div>

            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>

                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName="Your name"
                        type='text'
                        name="name"
                        placeholder='Jack Smith'
                        value={form.name}
                        handleChange={handleChange} />

                    <FormField
                        labelName='Prompt'
                        type='text'
                        name='prompt'
                        placeholder='A secret garden with plants that grow into intricate sculptures'
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe} />

                
                  <div id='imageF' className={`relative bg-gray-50 
                  border border-gray-300 text-gray-900 
                  text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-900 
                   ${expandedImage ? 'w-full h-full' : 'w-64 h-64'}
                    m-3 flex justify-self-center text-center justify-center
                     items-center`} onClick={() => 
                     setExpandedImage(!expandedImage)}>

                    {form.photo ? (<img src={form.photo} alt={form.prompt}
                        className='w-full h-full object-contain' />
                    ) : (
                        <img src={preview}
                            alt='preview' className='w-9/12 h-9/12 object-contain opacity-40 justify-center'>

                        </img>)}
                        {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
                    )}
                    {!expandedImage && (
            <div className="w-30 h-30 text-gray-900 flex items-top justify-center text-xs cursor-pointer tooltip">
              
              <span className="tooltiptext"></span>
              
            </div>
          )}
            </div>  
            
        
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-gray-950 font-medium 
            rounded-md text-sm w-full sm:w-auto px-5 
            py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
          </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">You can share the image with others in the community! </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#000000] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
          </div>
          </div>
            </form>
        </section>
    )
}

export default CreatePost
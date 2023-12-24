import './css/maincmp.css'
import NavBar from './NavBar'
import Terminus from './Terminus'
import AboutUs from './AboutUs'
import QuestionTables from './QuestionTables'
import FooterSet from './FooterSet'

const MainComponents = () => {
  return (
    <>
    <main>
      
    <NavBar />

    <div className="intro text-center m-32">
          <Terminus />
        </div>


        {
        /*
    <div className="container">
      <div className="bubbles">
      <span style={{ '--i': 11 } as React.CSSProperties}></span>
      <span style={{ '--i': 12 } as React.CSSProperties}></span>
      <span style={{ '--i': 24 } as React.CSSProperties}></span>
      <span style={{ '--i': 10 } as React.CSSProperties}></span>
      <span style={{ '--i': 14 } as React.CSSProperties}></span>
      <span style={{ '--i': 23 } as React.CSSProperties}></span>
      <span style={{ '--i': 18 } as React.CSSProperties}></span>
      <span style={{ '--i': 16 } as React.CSSProperties}></span>
      <span style={{ '--i': 19 } as React.CSSProperties}></span>
      <span style={{ '--i': 20 } as React.CSSProperties}></span>

  
        <span style={{ '--i': 22 } as React.CSSProperties}></span>
      <span style={{ '--i': 25 } as React.CSSProperties}></span>
      <span style={{ '--i': 18 } as React.CSSProperties}></span>
      <span style={{ '--i': 21 } as React.CSSProperties}></span>
      <span style={{ '--i': 15 } as React.CSSProperties}></span>
      <span style={{ '--i': 13 } as React.CSSProperties}></span>
      <span style={{ '--i': 26 } as React.CSSProperties}></span>
      <span style={{ '--i': 17 } as React.CSSProperties}></span>
      <span style={{ '--i': 13 } as React.CSSProperties}></span>
      <span style={{ '--i': 28 } as React.CSSProperties}></span>   
         </div>
    </div>
  */
}

      
<AboutUs />

  <QuestionTables />

<FooterSet />


  </main>
    </>
  )
}

export default MainComponents

        {/*
       <div className='box'>
  <div className='wave -one'> </div>
  <div className='wave -two'></div>
</div>
  */}
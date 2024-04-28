import { Boarding, DayCare, DogWalk, Grooming, Training } from "../../component/icon";
import SectionHead from "../../component/section-head";
import AppLayout from "../../layout/appLayout"
// import dogPaw from '../../public/dog-paw.png'
function Home() {
  return (
    <AppLayout  >
      <section className="elem-priority">
        <div className="container">
          <div className='row align-items-end'>
            <div className='col-sm-5'>
              <div className="elem-heading-title">
                <h1>Your pet, <br></br> our priority</h1>
              </div>
              <div className="d-flex align-items-center w-100 pb-5">
                <button type="button" className="pet-button pet-button-secondary">Learn more</button>
                <button type="button" className="pet-button pet-button-theme ml-2">Make a reservation</button>
              </div>
            </div>
            <div className='col-sm-7'>
              <div className="elem-priority-populated">
                <div className="elem-image-left">
                  <img width="180" height="264" src="https://petmania.vamtam.com/wp-content/uploads/2022/06/illustration-1.svg" className="attachment-large size-large" alt="" loading="lazy" />
                </div>
                <div className="elem-image-center">
                  <img width="498" height="458" src="https://petmania.vamtam.com/wp-content/uploads/2022/06/iStock-1143440918.png" className="attachment-large size-large" alt="" loading="lazy" />
                </div>
                <div className="elem-image-right">
                  <img width="240" height="363" src="https://petmania.vamtam.com/wp-content/uploads/2022/06/illustration-2.svg" className="attachment-large size-large" alt="" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="elem-pets-human">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <img src="./iStock-1266979046.webp" className="elem-pets-human-img" />
            </div>
            <div className="col-sm-6">
              <div className="elem-pets-human-head text-center">
                <h3>Happy pets, happy humans</h3>
                <p>Come see how I’m styling these final days of summer with bright palettes and pops of color that will dazzle your wardrobe year round!</p>
                <p>How I’m styling these final days of summer with bright palettes and pops of color that will dazzle your wardrobe year round!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="elem-pets-best-in py-5">
        <div className="container py-5">
          <SectionHead title='We are best in:' />
          <div className="d-flex align-items-center">
            <ul className="elem-pets-best-in-list pt-5">
              <li>
                <div className="elem-pets-best-in-list-name">
                  <div className="service-name">
                    <DayCare />
                  </div>
                  <p>Daycare</p>
                </div>
              </li>
              <li>
                <div className="elem-pets-best-in-list-name">
                  <div className="service-name">
                    <DogWalk />
                  </div>
                  <p>Dog Walking</p>
                </div>
              </li>
              <li>
                <div className="elem-pets-best-in-list-name">
                  <div className="service-name">
                    <Grooming />
                  </div>
                  <p>Grooming</p>
                </div>
              </li>
              <li>
                <div className="elem-pets-best-in-list-name">
                  <div className="service-name">
                    <Boarding />
                  </div>
                  <p>Boarding</p>
                </div>
              </li>
              <li>
                <div className="elem-pets-best-in-list-name">
                  <div className="service-name">
                    <Training />
                  </div>
                  <p>Training</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="elem-why-rely">
        <div className="container">
          <SectionHead title='Why rely on us?' />
          <div className="row col-sm-8 col-12 m-auto mt-5 pt-5">
            <div className="col-sm-6">
              <div className="d-flex align-items-start">
                <img src={'/dog-paw.png'} />
                {/* <img src={dogPaw} /> */}
                <div className="elem-why-rely-ans">
                  <h4>We love dogs</h4>
                  <p>Come see how I’m styling these final days of summer with bright palettes and pops of color that.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex align-items-start mb-4">
                <img src={'/dog-paw.png'} />
                <div className="elem-why-rely-ans">
                  <h4>We love dogs</h4>
                  <p>Come see how I’m styling these final days of summer with bright palettes and pops of color that.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex align-items-start mb-4">
                <img src={'/dog-paw.png'} />
                <div className="elem-why-rely-ans">
                  <h4>We love dogs</h4>
                  <p>Come see how I’m styling these final days of summer with bright palettes and pops of color that.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex align-items-start mb-4">
                <img src={'/dog-paw.png'} />
                <div className="elem-why-rely-ans">
                  <h4>We love dogs</h4>
                  <p>Come see how I’m styling these final days of summer with bright palettes and pops of color that.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex align-items-start mb-4">
                <img src={'/dog-paw.png'} />
                <div className="elem-why-rely-ans">
                  <h4>We love dogs</h4>
                  <p>Come see how I’m styling these final days of summer with bright palettes and pops of color that.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="elem-meetus">
        <div className="container">
          <SectionHead title='Let’s meet!' />
        </div>
      </section>
    </AppLayout>
  );
}
export default Home
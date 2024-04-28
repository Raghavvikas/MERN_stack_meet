import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from './form/button';

export default function Footer() {
    const navigate = useNavigate()
    return <div className='elem-footer'>
        <div className='container'>
            <div className='elem-footer-widget'>
                <div className='mt-3 row'>
                    <div className='col-sm-6'>
                        Logo
                    </div>
                    <div className='col-sm-6'>
                        <ul className='elem-footer-social'>
                            <li><a href='' target={'_blank'}><i className='fab fa-instagram'></i></a></li>
                            <li><a href='' target={'_blank'}><i className='fab fa-facebook'></i></a></li>
                        </ul>
                    </div>
                    <div className='col-sm-12 my-4'>
                        <div className='elem-footer-border'></div>
                        <a className="elem-footer-icon" href="#top">
                            <i className="fa-solid fa-chevron-up"></i>
                        </a>
                    </div>
                    <div className='col-sm-6'>
                        <p>Professional Dog Walking and Pet Care Services <br></br>New York City, NY ⸺&nbsp;<a href="" target="_blank" rel="noopener">Brooklyn</a> and <a href="https://www.google.com/maps/place/184+Riverside+Blvd,+New+York,+NY+10069,+Съединени+щати/@40.7786685,-73.9882066,18z/data=!3m1!4b1!4m5!3m4!1s0x89c258612dd0505d:0xd46ac8102c7441e0!8m2!3d40.7786685!4d-73.9882066" target="_blank" rel="noopener">Manhattan</a></p>
                    </div>
                    <div className='col-sm-6'>
                        <ul className='elem-footer-menu'>
                            <li><Link to=''>Services</Link></li>
                            <li><Link to=''>About us</Link></li>
                            <li><Link to=''>Locations</Link></li>
                            <li><Link to=''>Contact us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='text-center py-5'>
                    <div className='elem-footer-title pt-5'>
                        <h2>Are you ready to get started?</h2>
                    </div>
                    <div className='d-flex align-items-center justify-content-center elem-footer-links pt-3'>
                        <a href=''>hi@petmania.com</a>
                        {/* <Button type='button' className='pet-button pet-button-theme' onClick={()=>navigate('/login')}>Login</Button> */}
                        <a href=''>+1-800-356-8933</a>
                    </div>
                    <div className='copyright pt-5'>PetMania © 2022   |   1000S 8th Avenue, NY</div>
                    <div className='elem-footer-info'>
                        <ul className='elem-footer-menu'>
                            <li><a href=''>Privacy</a></li>
                            <li><a href=''>Terms</a></li>
                            <li><a href=''>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

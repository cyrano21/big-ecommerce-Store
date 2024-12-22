import React from 'react'
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">À propos</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Votre destination shopping en ligne pour les meilleurs produits aux meilleurs prix. Découvrez notre sélection unique et nos offres exclusives.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-200">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transform hover:scale-110 transition-all duration-200">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 transform hover:scale-110 transition-all duration-200">
                <Twitter size={22} />
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service Client</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 group-hover:w-2 transition-all duration-200"></span>
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 group-hover:w-2 transition-all duration-200"></span>
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 group-hover:w-2 transition-all duration-200"></span>
                  <span>Livraison</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 group-hover:w-2 transition-all duration-200"></span>
                  <span>Retours</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Informations Légales</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 group-hover:w-2 transition-all duration-200"></span>
                  <span>Conditions générales</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 group-hover:w-2 transition-all duration-200"></span>
                  <span>Politique de confidentialité</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 group-hover:w-2 transition-all duration-200"></span>
                  <span>Mentions légales</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Newsletter</h3>
            <p className="text-sm text-gray-600">Inscrivez-vous pour recevoir nos dernières offres et nouveautés.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02]">
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Votre Store. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

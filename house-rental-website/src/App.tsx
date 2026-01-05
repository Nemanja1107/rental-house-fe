import { useEffect, useState } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import FullGallery from './components/sections/FullGallery';
import Attractions from './components/sections/Attractions';
import Rooms from './components/sections/Rooms';
import About from './components/sections/About';
import Reservation from './components/sections/Reservation';
import AdminPage from './components/pages/AdminPage';
import AvailabilityPage from './components/pages/AvailabilityPage';
import type { GalleryImage } from './types';

// Import hero background image
import heroImage from './assets/images/CB0A4782.jpg';
import heroImage2 from './assets/images/CB0A4790.jpg';
import heroImage3 from './assets/images/CB0A4813.jpg';
import FAQ from './components/sections/FAQ';

// Note: For gallery images, you can copy your images to the public folder 
// and reference them directly, or import them individually like the hero image

function App() {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showAvailabilityPage, setShowAvailabilityPage] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  // Scroll to top when switching between pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Clear selected room when navigating away from main page
    if (showFullGallery || showAvailabilityPage || showAdminPage) {
      setSelectedRoomId('');
    }
  }, [showFullGallery, showAvailabilityPage, showAdminPage]);

  // Handle booking navigation from availability page
  const handleBookNow = (roomId: string) => {
    setSelectedRoomId(roomId);
    setShowAvailabilityPage(false);
    // Small delay to ensure page transition completes before scrolling
    setTimeout(() => {
      const reservationElement = document.getElementById('reservation');
      if (reservationElement) {
        reservationElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // 8 representative house images for preview
  const previewImages: GalleryImage[] = [
    { id: 'ext1', src: heroImage, alt: 'House exterior view', category: 'exterior' },
    { id: 'liv1', src: heroImage2, alt: 'Living room', category: 'interior' },
    { id: 'bed1', src: '/src/assets/images/Soba bracni.jpg', alt: 'Master bedroom', category: 'interior' },
    { id: 'kit1', src: heroImage3, alt: 'Kitchen', category: 'interior' },
    { id: 'bath1', src: '/src/assets/images/Kupatilo 1.jpg', alt: 'Bathroom', category: 'interior' },
    { id: 'ext2', src: '/src/assets/images/CB0A4784.jpg', alt: 'House exterior', category: 'exterior' },
    { id: 'hall1', src: '/src/assets/images/Hodnik.jpg', alt: 'Hallway', category: 'amenities' },
    { id: 'stairs1', src: '/src/assets/images/Stepenice.jpg', alt: 'Staircase', category: 'amenities' }
  ];

  // All house images for full gallery - MANUALLY SORTED BY ROOM
  // To move a photo to different category, just change the roomCategory value
  const allHouseImages: GalleryImage[] = [
    // ========== LIVING ROOM SECTION (Dnevni boravak) ==========
    // Exterior photos
    { id: 'ext1', src: heroImage, alt: 'House exterior view', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext3', src: '/src/assets/images/CB0A4790.jpg', alt: 'House side view', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext4', src: '/src/assets/images/CB0A4793.jpg', alt: 'House garden area', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext5', src: '/src/assets/images/CB0A4795.jpg', alt: 'House outdoor space', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext6', src: '/src/assets/images/CB0A4800.jpg', alt: 'House exterior detail', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext7', src: '/src/assets/images/CB0A4802.jpg', alt: 'House surroundings', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext9', src: '/src/assets/images/CB0A4805.jpg', alt: 'House exterior angle', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext10', src: '/src/assets/images/CB0A4806.jpg', alt: 'House outdoor area', category: 'exterior', roomCategory: 'living-room' },
    // Living room interior photos
    { id: 'liv1', src: '/src/assets/images/Dnevna soba 1.jpg', alt: 'Living room with comfortable seating', category: 'interior', roomCategory: 'living-room' },
    { id: 'liv2', src: '/src/assets/images/Dnevna soba 2.jpg', alt: 'Spacious living area', category: 'interior', roomCategory: 'living-room' },
    { id: 'liv3', src: '/src/assets/images/Dnevna soba 3.jpg', alt: 'Cozy living room setup', category: 'interior', roomCategory: 'living-room' },
    { id: 'liv4', src: '/src/assets/images/Dnevna soba 4.jpg', alt: 'Living room with natural light', category: 'interior', roomCategory: 'living-room' },

    // ========== BEDROOM SECTION (Spavaće sobe) ==========
    { id: 'bed1', src: '/src/assets/images/Soba bracni.jpg', alt: 'Master bedroom with double bed', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed2', src: '/src/assets/images/Soba bracni 2.jpg', alt: 'Master bedroom view', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed3', src: '/src/assets/images/Bracni i regal.jpg', alt: 'Master bedroom with storage', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed4', src: '/src/assets/images/Soba obicni kreveti.jpg', alt: 'Twin bedroom', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed5', src: '/src/assets/images/Soba obicni kreveti 2.jpg', alt: 'Second twin bedroom', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed6', src: '/src/assets/images/Detail soba.jpg', alt: 'Bedroom detail view', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext20', src: '/src/assets/images/CB0A4831.jpg', alt: 'House exterior detail', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext21', src: '/src/assets/images/CB0A4833.jpg', alt: 'House outdoor space', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext22', src: '/src/assets/images/CB0A4835.jpg', alt: 'House exterior view', category: 'exterior', roomCategory: 'bedroom' },
    { id: 'ext23', src: '/src/assets/images/CB0A4838.jpg', alt: 'House landscape view', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext26', src: '/src/assets/images/CB0A4849.jpg', alt: 'House exterior angle', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext27', src: '/src/assets/images/CB0A4852.jpg', alt: 'House garden detail', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext30', src: '/src/assets/images/CB0A4856.jpg', alt: 'House exterior detail', category: 'interior', roomCategory: 'bedroom' },


    // ========== KITCHEN SECTION (Kuhinja) ==========
    { id: 'kit1', src: '/src/assets/images/Kuhinja 2.jpg', alt: 'Fully equipped kitchen', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit2', src: '/src/assets/images/Kuhinja sto.jpg', alt: 'Kitchen dining area', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit3', src: '/src/assets/images/CB0A4808.jpg', alt: 'House exterior view', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit4', src: '/src/assets/images/CB0A4809.jpg', alt: 'House garden view', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit5', src: '/src/assets/images/CB0A4810.jpg', alt: 'House exterior detail', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit6', src: '/src/assets/images/CB0A4813.jpg', alt: 'House exterior view', category: 'interior', roomCategory: 'kitchen' },


    // ========== BATHROOM SECTION (Kupatilo) ==========
    { id: 'bath1', src: '/src/assets/images/Kupatilo 1.jpg', alt: 'Modern bathroom', category: 'interior', roomCategory: 'bathroom' },
    { id: 'bath2', src: '/src/assets/images/Kupatilo 2.jpg', alt: 'Bathroom with shower', category: 'interior', roomCategory: 'bathroom' },
    { id: 'ext16', src: '/src/assets/images/CB0A4822.jpg', alt: 'House surroundings', category: 'interior', roomCategory: 'bathroom' },
    { id: 'ext19', src: '/src/assets/images/CB0A4828.jpg', alt: 'House garden view', category: 'interior', roomCategory: 'bathroom' },



    // ========== AMENITIES & DETAILS SECTION (Sadržaji i detalji) ==========
    { id: 'hall1', src: '/src/assets/images/Hodnik.jpg', alt: 'House hallway', category: 'amenities', roomCategory: 'amenities' },
    { id: 'hall2', src: '/src/assets/images/Hodnik 2.jpg', alt: 'Interior corridor', category: 'amenities', roomCategory: 'amenities' },
    { id: 'hall3', src: '/src/assets/images/Hodnik 3.jpg', alt: 'House entrance hall', category: 'amenities', roomCategory: 'amenities' },
    { id: 'stairs1', src: '/src/assets/images/Stepenice.jpg', alt: 'House staircase', category: 'amenities', roomCategory: 'amenities' },
    { id: 'mirror1', src: '/src/assets/images/Ogledalo.jpg', alt: 'Decorative mirror', category: 'amenities', roomCategory: 'amenities' },
    { id: 'shelves1', src: '/src/assets/images/Police.jpg', alt: 'Storage shelves', category: 'amenities', roomCategory: 'amenities' },
    { id: 'clock1', src: '/src/assets/images/Sat.jpg', alt: 'Wall clock detail', category: 'amenities', roomCategory: 'amenities' },
    { id: 'shelves2', src: '/src/assets/images/CB0A4784.jpg', alt: 'House front entrance', category: 'amenities', roomCategory: 'amenities' },
    { id: 'tv', src: '/src/assets/images/CB0A4804.jpg', alt: 'House landscape view', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext15', src: '/src/assets/images/CB0A4817.jpg', alt: 'House landscape', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext17', src: '/src/assets/images/CB0A4824.jpg', alt: 'House outdoor area', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext18', src: '/src/assets/images/CB0A4826.jpg', alt: 'House exterior angle', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext24', src: '/src/assets/images/CB0A4844.jpg', alt: 'House surroundings', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext25', src: '/src/assets/images/CB0A4845.jpg', alt: 'House outdoor area', category: 'amenities', roomCategory: 'amenities' },


  ];

  return (
    <TranslationProvider>
      {showAdminPage ? (
        /* Admin Page */
        <AdminPage onBack={() => setShowAdminPage(false)} />
      ) : showAvailabilityPage ? (
        /* Availability Page */
        <AvailabilityPage
          onBack={() => setShowAvailabilityPage(false)}
          onBookNow={handleBookNow}
        />
      ) : showFullGallery ? (
        /* Full Gallery Page */
        <FullGallery
          images={allHouseImages}
          onBack={() => setShowFullGallery(false)}
        />
      ) : (
        /* Main Website */
        <div className="min-h-screen bg-white">
          <Navbar
            onAdminClick={() => setShowAdminPage(true)}
          />

          {/* Hero Section */}
          <Hero backgroundImage={heroImage} />

          <main>

            {/* Gallery Section */}
            <Gallery
              images={previewImages}
              totalImages={allHouseImages.length}
              onViewAllClick={() => setShowFullGallery(true)}
            />

            {/* Attractions Section */}
            <Attractions />

            {/* About Section */}
            <About />

            {/* Rooms Section */}
            <Rooms onCheckAvailability={() => setShowAvailabilityPage(true)} />

            {/* Reservation Section */}
            <Reservation selectedRoomId={selectedRoomId} />

            {/* FAQ Section */}
            <FAQ />
          </main>

          <Footer />
        </div>
      )}
    </TranslationProvider>
  )
}

export default App
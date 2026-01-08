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
import FAQ from './components/sections/FAQ';
import type { GalleryImage } from './types';

// Import all images
import heroImage from './assets/images/CB0A4782.jpg';
import heroImage2 from './assets/images/CB0A4790.jpg';
import heroImage3 from './assets/images/CB0A4813.jpg';
import sobaBracni from './assets/images/soba-bracni.jpg';
import kupatilo1 from './assets/images/kupatilo-1.jpg';
import cb4784 from './assets/images/CB0A4784.jpg';
import hodnik from './assets/images/hodnik.jpg';
import stepenice from './assets/images/Stepenice.jpg';
import cb4793 from './assets/images/CB0A4793.jpg';
import cb4795 from './assets/images/CB0A4795.jpg';
import cb4800 from './assets/images/CB0A4800.jpg';
import cb4802 from './assets/images/CB0A4802.jpg';
import cb4805 from './assets/images/CB0A4805.jpg';
import cb4806 from './assets/images/CB0A4806.jpg';
import dnevnaSoba1 from './assets/images/dnevna-soba-1.jpg';
import dnevnaSoba2 from './assets/images/dnevna-soba-2.jpg';
import dnevnaSoba3 from './assets/images/dnevna-soba-3.jpg';
import dnevnaSoba4 from './assets/images/dnevna-soba-4.jpg';
import sobaBracni2 from './assets/images/soba-bracni-2.jpg';
import bracniRegal from './assets/images/bracni-i-regal.jpg';
import sobaObicni from './assets/images/soba-obicni-kreveti.jpg';
import sobaObicni2 from './assets/images/soba-obicni-kreveti-2.jpg';
import detailSoba from './assets/images/detail-soba.jpg';
import cb4831 from './assets/images/CB0A4831.jpg';
import cb4833 from './assets/images/CB0A4833.jpg';
import cb4835 from './assets/images/CB0A4835.jpg';
import cb4838 from './assets/images/CB0A4838.jpg';
import cb4849 from './assets/images/CB0A4849.jpg';
import cb4852 from './assets/images/CB0A4852.jpg';
import cb4856 from './assets/images/CB0A4856.jpg';
import kuhinja2 from './assets/images/kuhinja-2.jpg';
import kuhinjaSto from './assets/images/kuhinja-sto.jpg';
import cb4808 from './assets/images/CB0A4808.jpg';
import cb4809 from './assets/images/CB0A4809.jpg';
import cb4810 from './assets/images/CB0A4810.jpg';
import kupatilo2 from './assets/images/kupatilo-2.jpg';
import cb4822 from './assets/images/CB0A4822.jpg';
import cb4828 from './assets/images/CB0A4828.jpg';
import hodnik2 from './assets/images/hodnik-2.jpg';
import hodnik3 from './assets/images/hodnik-3.jpg';
import ogledalo from './assets/images/ogledalo.jpg';
import police from './assets/images/police.jpg';
import sat from './assets/images/sat.jpg';
import cb4804 from './assets/images/CB0A4804.jpg';
import cb4817 from './assets/images/CB0A4817.jpg';
import cb4824 from './assets/images/CB0A4824.jpg';
import cb4826 from './assets/images/CB0A4826.jpg';
import cb4844 from './assets/images/CB0A4844.jpg';
import cb4845 from './assets/images/CB0A4845.jpg';

function App() {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showAvailabilityPage, setShowAvailabilityPage] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (showFullGallery || showAvailabilityPage || showAdminPage) {
      setSelectedRoomId('');
    }
  }, [showFullGallery, showAvailabilityPage, showAdminPage]);

  const handleBookNow = (roomId: string) => {
    setSelectedRoomId(roomId);
    setShowAvailabilityPage(false);
    setTimeout(() => {
      const reservationElement = document.getElementById('reservation');
      if (reservationElement) {
        reservationElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const previewImages: GalleryImage[] = [
    { id: 'ext1', src: heroImage, alt: 'House exterior view', category: 'exterior' },
    { id: 'liv1', src: heroImage2, alt: 'Living room', category: 'interior' },
    { id: 'bed1', src: sobaBracni, alt: 'Master bedroom', category: 'interior' },
    { id: 'kit1', src: heroImage3, alt: 'Kitchen', category: 'interior' },
    { id: 'bath1', src: kupatilo1, alt: 'Bathroom', category: 'interior' },
    { id: 'ext2', src: cb4784, alt: 'House exterior', category: 'exterior' },
    { id: 'hall1', src: hodnik, alt: 'Hallway', category: 'amenities' },
    { id: 'stairs1', src: stepenice, alt: 'Staircase', category: 'amenities' }
  ];

  const allHouseImages: GalleryImage[] = [
    // Living Room Section
    { id: 'ext1', src: heroImage, alt: 'House exterior view', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext3', src: heroImage2, alt: 'House side view', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext4', src: cb4793, alt: 'House garden area', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext5', src: cb4795, alt: 'House outdoor space', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext6', src: cb4800, alt: 'House exterior detail', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext7', src: cb4802, alt: 'House surroundings', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext9', src: cb4805, alt: 'House exterior angle', category: 'exterior', roomCategory: 'living-room' },
    { id: 'ext10', src: cb4806, alt: 'House outdoor area', category: 'exterior', roomCategory: 'living-room' },
    { id: 'liv1', src: dnevnaSoba1, alt: 'Living room with comfortable seating', category: 'interior', roomCategory: 'living-room' },
    { id: 'liv2', src: dnevnaSoba2, alt: 'Spacious living area', category: 'interior', roomCategory: 'living-room' },
    { id: 'liv3', src: dnevnaSoba3, alt: 'Cozy living room setup', category: 'interior', roomCategory: 'living-room' },
    { id: 'liv4', src: dnevnaSoba4, alt: 'Living room with natural light', category: 'interior', roomCategory: 'living-room' },

    // Bedroom Section
    { id: 'bed1', src: sobaBracni, alt: 'Master bedroom with double bed', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed2', src: sobaBracni2, alt: 'Master bedroom view', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed3', src: bracniRegal, alt: 'Master bedroom with storage', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed4', src: sobaObicni, alt: 'Twin bedroom', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed5', src: sobaObicni2, alt: 'Second twin bedroom', category: 'interior', roomCategory: 'bedroom' },
    { id: 'bed6', src: detailSoba, alt: 'Bedroom detail view', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext20', src: cb4831, alt: 'House exterior detail', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext21', src: cb4833, alt: 'House outdoor space', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext22', src: cb4835, alt: 'House exterior view', category: 'exterior', roomCategory: 'bedroom' },
    { id: 'ext23', src: cb4838, alt: 'House landscape view', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext26', src: cb4849, alt: 'House exterior angle', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext27', src: cb4852, alt: 'House garden detail', category: 'interior', roomCategory: 'bedroom' },
    { id: 'ext30', src: cb4856, alt: 'House exterior detail', category: 'interior', roomCategory: 'bedroom' },

    // Kitchen Section
    { id: 'kit1', src: kuhinja2, alt: 'Fully equipped kitchen', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit2', src: kuhinjaSto, alt: 'Kitchen dining area', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit3', src: cb4808, alt: 'House exterior view', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit4', src: cb4809, alt: 'House garden view', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit5', src: cb4810, alt: 'House exterior detail', category: 'interior', roomCategory: 'kitchen' },
    { id: 'kit6', src: heroImage3, alt: 'House exterior view', category: 'interior', roomCategory: 'kitchen' },

    // Bathroom Section
    { id: 'bath1', src: kupatilo1, alt: 'Modern bathroom', category: 'interior', roomCategory: 'bathroom' },
    { id: 'bath2', src: kupatilo2, alt: 'Bathroom with shower', category: 'interior', roomCategory: 'bathroom' },
    { id: 'ext16', src: cb4822, alt: 'House surroundings', category: 'interior', roomCategory: 'bathroom' },
    { id: 'ext19', src: cb4828, alt: 'House garden view', category: 'interior', roomCategory: 'bathroom' },

    // Amenities Section
    { id: 'hall1', src: hodnik, alt: 'House hallway', category: 'amenities', roomCategory: 'amenities' },
    { id: 'hall2', src: hodnik2, alt: 'Interior corridor', category: 'amenities', roomCategory: 'amenities' },
    { id: 'hall3', src: hodnik3, alt: 'House entrance hall', category: 'amenities', roomCategory: 'amenities' },
    { id: 'stairs1', src: stepenice, alt: 'House staircase', category: 'amenities', roomCategory: 'amenities' },
    { id: 'mirror1', src: ogledalo, alt: 'Decorative mirror', category: 'amenities', roomCategory: 'amenities' },
    { id: 'shelves1', src: police, alt: 'Storage shelves', category: 'amenities', roomCategory: 'amenities' },
    { id: 'clock1', src: sat, alt: 'Wall clock detail', category: 'amenities', roomCategory: 'amenities' },
    { id: 'shelves2', src: cb4784, alt: 'House front entrance', category: 'amenities', roomCategory: 'amenities' },
    { id: 'tv', src: cb4804, alt: 'House landscape view', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext15', src: cb4817, alt: 'House landscape', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext17', src: cb4824, alt: 'House outdoor area', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext18', src: cb4826, alt: 'House exterior angle', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext24', src: cb4844, alt: 'House surroundings', category: 'amenities', roomCategory: 'amenities' },
    { id: 'ext25', src: cb4845, alt: 'House outdoor area', category: 'amenities', roomCategory: 'amenities' },
  ];

  return (
    <TranslationProvider>
      {showAdminPage ? (
        <AdminPage onBack={() => setShowAdminPage(false)} />
      ) : showAvailabilityPage ? (
        <AvailabilityPage
          onBack={() => setShowAvailabilityPage(false)}
          onBookNow={handleBookNow}
        />
      ) : showFullGallery ? (
        <FullGallery
          images={allHouseImages}
          onBack={() => setShowFullGallery(false)}
        />
      ) : (
        <div className="min-h-screen bg-white">
          <Navbar onAdminClick={() => setShowAdminPage(true)} />
          <Hero backgroundImage={heroImage} />
          <main>
            <Gallery
              images={previewImages}
              totalImages={allHouseImages.length}
              onViewAllClick={() => setShowFullGallery(true)}
            />
            <Attractions />
            <About />
            <Rooms onCheckAvailability={() => setShowAvailabilityPage(true)} />
            <Reservation selectedRoomId={selectedRoomId} />
            <FAQ />
          </main>
          <Footer />
        </div>
      )}
    </TranslationProvider>
  )
}

export default App
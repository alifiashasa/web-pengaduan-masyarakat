export interface LocationData {
  [province: string]: string[];
}

export const useLocation = () => {
  const locations: LocationData = {
    'DI Yogyakarta': ['Kota Yogyakarta', 'Sleman', 'Bantul', 'Kulon Progo', 'Gunungkidul'],
    'DKI Jakarta': [
      'Jakarta Selatan',
      'Jakarta Pusat',
      'Jakarta Barat',
      'Jakarta Timur',
      'Jakarta Utara',
    ],
    'Jawa Barat': ['Bandung', 'Bekasi', 'Bogor', 'Depok', 'Cimahi', 'Tasikmalaya'],
    'Jawa Tengah': ['Semarang', 'Surakarta', 'Magelang', 'Salatiga', 'Pekalongan'],
    'Jawa Timur': ['Surabaya', 'Malang', 'Batu', 'Kediri', 'Madiun'],
    Bali: ['Denpasar', 'Badung', 'Gianyar', 'Tabanan'],
  };

  const getProvinces = () => Object.keys(locations);

  const getCitiesByProvince = (province: string) => {
    return locations[province] || [];
  };

  return {
    locations,
    getProvinces,
    getCitiesByProvince,
  };
};

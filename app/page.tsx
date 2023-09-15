import AfricaMap from '@/components/AfricaMap/AfricaMap';

const HomePage = () => {
  return (
    <div className="text-3xl font-bold text-blue-300">
      <h1>Homepage</h1>
      <div>
        <h2>Africa</h2>
        <AfricaMap />
      </div>
    </div>
  );
};

export default HomePage;

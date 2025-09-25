import { useParams, useNavigate } from 'react-router-dom';
import { usePhone } from '@/hooks/usePhones';
import { BackButton } from '../components/phone-detail/back-button';
import { ErrorState } from '../components/phone-detail/error-state';
import { LoadingState } from '../components/phone-detail/loading-state';
import { PhoneImage } from '../components/phone-detail/phone-image';
import { PhoneInfo } from '../components/phone-detail/phone-info';
import { PhoneSpecs } from '../components/phone-detail/phone-specs/phone-specs';

export function PhoneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const phoneId = id ? parseInt(id, 10) : 0;

  const { data: phone, isLoading, error } = usePhone(phoneId);

  const handleBackClick = () => navigate('/');

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <BackButton onClick={handleBackClick} />
        <ErrorState message={`Error loading phone details: ${error.message}`} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <BackButton onClick={handleBackClick} />
        <LoadingState />
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="container mx-auto p-8">
        <BackButton onClick={handleBackClick} />
        <ErrorState
          message="Phone not found"
          variant="default"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <BackButton onClick={handleBackClick} className="mb-6" />

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <PhoneImage src={phone.image} alt={phone.name} />
        <PhoneInfo phone={phone} />
      </div>

      <PhoneSpecs phone={phone} />
    </div>
  );
}

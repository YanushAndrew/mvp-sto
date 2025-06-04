import React from 'react';
import { Card, CardBody, CardHeader, Divider, Avatar, Button, Input, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  carInfo: {
    make: string;
    model: string;
  };
  serviceDate: string;
  rating: number;
  comment: string;
  mechanic: string;
  serviceType: string[];
  reply?: {
    name: string;
    date: string;
    comment: string;
  };
}

export const Reviews: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  
  const reviews: Review[] = [
    {
      id: 'review-1',
      customer: {
        name: 'James Wilson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10'
      },
      carInfo: {
        make: 'Toyota',
        model: 'Camry'
      },
      serviceDate: '2023-06-10',
      rating: 5,
      comment: 'Excellent service! My car was fixed quickly and the staff was very professional. I appreciate the detailed explanation of what was wrong and how it was fixed.',
      mechanic: 'John Smith',
      serviceType: ['Oil Change', 'Brake Inspection', 'Tire Rotation'],
      reply: {
        name: 'Service Manager',
        date: '2023-06-11',
        comment: 'Thank you for your kind words, James! Were glad we could help and look forward to serving you again.'
      }
    },
    {
      id: 'review-2',
      customer: {
        name: 'Emma Thompson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=11'
      },
      carInfo: {
        make: 'Honda',
        model: 'Civic'
      },
      serviceDate: '2023-06-08',
      rating: 4,
      comment: 'Good service overall. The repair took a bit longer than expected, but the quality of work was excellent. The waiting area could use some improvements.',
      mechanic: 'Mike Johnson',
      serviceType: ['Engine Repair', 'Electrical System']
    },
    {
      id: 'review-3',
      customer: {
        name: 'Michael Brown',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=12'
      },
      carInfo: {
        make: 'Ford',
        model: 'F-150'
      },
      serviceDate: '2023-06-05',
      rating: 5,
      comment: 'Sarah did an amazing job with my truck! The transmission is running smoother than ever. I highly recommend this service center to anyone with a Ford.',
      mechanic: 'Sarah Williams',
      serviceType: ['Transmission Service', 'Cooling System'],
      reply: {
        name: 'Sarah Williams',
        date: '2023-06-06',
        comment: 'Thank you for the kind review, Michael! Im glad your truck is running well. See you at your next service!'
      }
    },
    {
      id: 'review-4',
      customer: {
        name: 'Sophia Garcia',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=13'
      },
      carInfo: {
        make: 'BMW',
        model: '3 Series'
      },
      serviceDate: '2023-06-03',
      rating: 3,
      comment: 'The diagnostic was accurate, but I was expecting more communication during the repair process. The final result was good, but I would have appreciated more updates.',
      mechanic: 'Robert Brown',
      serviceType: ['Diagnostic', 'Software Update']
    },
    {
      id: 'review-5',
      customer: {
        name: 'Daniel Martinez',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=14'
      },
      carInfo: {
        make: 'Tesla',
        model: 'Model 3'
      },
      serviceDate: '2023-06-01',
      rating: 2,
      comment: 'Disappointed with the service. The battery issue wasn\'t properly fixed the first time, and I had to bring the car back. The second attempt was successful, but it cost me extra time.',
      mechanic: 'Emily Davis',
      serviceType: ['Battery Service', 'Charging System']
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.carInfo.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.carInfo.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.mechanic.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') {
      return matchesSearch;
    } else if (activeFilter === 'positive') {
      return matchesSearch && review.rating >= 4;
    } else if (activeFilter === 'neutral') {
      return matchesSearch && review.rating === 3;
    } else if (activeFilter === 'negative') {
      return matchesSearch && review.rating <= 2;
    } else if (activeFilter === 'unreplied') {
      return matchesSearch && !review.reply;
    }
    
    return matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Icon 
        key={index}
        icon={index < rating ? "lucide:star" : "lucide:star-off"}
        className={index < rating ? "text-warning" : "text-default-300"}
        width={16}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Пошук відгуків..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" width={18} />}
          className="max-w-md"
        />
        <div className="flex gap-2">
          <Button 
            variant={activeFilter === 'all' ? 'flat' : 'light'} 
            color={activeFilter === 'all' ? 'primary' : 'default'}
            onPress={() => setActiveFilter('all')}
          >
            Усі
          </Button>
          <Button 
            variant={activeFilter === 'positive' ? 'flat' : 'light'} 
            color={activeFilter === 'positive' ? 'success' : 'default'}
            onPress={() => setActiveFilter('positive')}
          >
            Позитивні
          </Button>
          <Button 
            variant={activeFilter === 'neutral' ? 'flat' : 'light'} 
            color={activeFilter === 'neutral' ? 'warning' : 'default'}
            onPress={() => setActiveFilter('neutral')}
          >
            Нейтральні
          </Button>
          <Button 
            variant={activeFilter === 'negative' ? 'flat' : 'light'} 
            color={activeFilter === 'negative' ? 'danger' : 'default'}
            onPress={() => setActiveFilter('negative')}
          >
            Негативні
          </Button>
          <Button 
            variant={activeFilter === 'unreplied' ? 'flat' : 'light'} 
            color={activeFilter === 'unreplied' ? 'secondary' : 'default'}
            onPress={() => setActiveFilter('unreplied')}
          >
            Без відповіді
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardBody>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <Avatar src={review.customer.avatar} size="lg" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{review.customer.name}</h3>
                        <p className="text-small text-default-500">
                          {review.carInfo.make} {review.carInfo.model} • {new Date(review.serviceDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex mt-2 sm:mt-0">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    
                    <p className="my-2">{review.comment}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-3 mb-4">
                      {review.serviceType.map((service, index) => (
                        <span key={index} className="text-tiny bg-default-100 px-2 py-1 rounded-md">
                          {service}
                        </span>
                      ))}
                      <span className="text-tiny bg-primary-100 text-primary-500 px-2 py-1 rounded-md">
                        Механік: {review.mechanic}
                      </span>
                    </div>
                    
                    {review.reply ? (
                      <div className="bg-default-50 p-3 rounded-md mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{review.reply.name}</h4>
                          <span className="text-tiny text-default-500">
                            {new Date(review.reply.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-small">{review.reply.comment}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end mt-2">
                        <Button 
                          size="sm" 
                          color="primary" 
                          variant="flat"
                          startContent={<Icon icon="lucide:reply" width={16} />}
                        >
                          Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
        
        {filteredReviews.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-default-200 rounded-large">
            <Icon icon="lucide:message-square-off" className="text-default-300" width={48} />
            <p className="mt-4 text-default-500">Не знайдено відгуків, що відповідають критеріям.</p>
            <Button 
              variant="flat" 
              color="primary" 
              className="mt-4"
              onPress={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            >
              Очистити фільтри
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

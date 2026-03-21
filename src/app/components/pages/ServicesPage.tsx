import { Link } from "react-router";
import { Button } from "../ui/button";
import { Truck, TruckIcon, Mountain, Factory } from "lucide-react";

export function ServicesPage() {
  const services = [
    {
      icon: <Truck className="w-16 h-16 text-accent" />,
      title: "Goods Transportation",
      description:
        "Our comprehensive goods transportation service ensures your cargo reaches its destination safely and on time. We handle everything from small packages to large freight with the utmost care and professionalism.",
      features: [
        "Real-time GPS tracking",
        "Secure packaging and handling",
        "Insurance coverage available",
        "Interstate transportation",
        "Same-day and next-day delivery options",
      ],
      image: "https://images.unsplash.com/photo-1700716465891-9e5e9f501d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHRydWNrJTIwbG9hZGluZ3xlbnwxfHx8fDE3NzM4NjI0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: <TruckIcon className="w-16 h-16 text-accent" />,
      title: "Trucking Services",
      description:
        "Professional trucking services with a modern fleet of vehicles equipped to handle diverse cargo requirements. Our experienced drivers and logistics team ensure smooth operations from pickup to delivery.",
      features: [
        "Fleet of modern trucks",
        "Experienced and verified drivers",
        "Flexible scheduling",
        "Long-haul and short-haul services",
        "24/7 customer support",
      ],
      image: "https://images.unsplash.com/photo-1620059116993-398c21ce8406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BvcnRhdGlvbiUyMGZsZWV0JTIwdHJ1Y2tzfGVufDF8fHx8MTc3MzkzNzUxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: <Mountain className="w-16 h-16 text-accent" />,
      title: "Sand Supply",
      description:
        "High-quality sand supply for construction projects of all scales. We source premium materials and deliver them directly to your site, ensuring your project stays on schedule and within budget.",
      features: [
        "Premium quality sand",
        "Various grades available",
        "Bulk and retail quantities",
        "Direct site delivery",
        "Competitive pricing",
      ],
      image: "https://images.unsplash.com/photo-1760045788252-d8d386ea1d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBzYW5kJTIwc3VwcGx5fGVufDF8fHx8MTc3MzkzNzUwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: <Factory className="w-16 h-16 text-accent" />,
      title: "Steel Supply",
      description:
        "Comprehensive steel supply solutions for construction and industrial needs. We provide certified steel materials from trusted manufacturers, delivered with precision and care to your construction site.",
      features: [
        "Certified quality steel",
        "Various grades and sizes",
        "TMT bars, angles, channels",
        "Timely delivery guaranteed",
        "Competitive market rates",
      ],
      image: "/steel.jpg",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl mb-6">Our Services</h1>
          <p className="text-xl text-[#c8d9e8] max-w-3xl mx-auto">
            Comprehensive transportation and supply solutions tailored to meet your business needs
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-6">{service.icon}</div>
                <h2 className="text-3xl mb-4 text-primary">{service.title}</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-accent mr-2 mt-1">✓</span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/quote">
                  <Button className="bg-accent hover:bg-accent/90 text-white">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#e8f0f7]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6 text-primary">Need a Custom Solution?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We offer tailored services to meet your specific requirements. Contact us to discuss your needs.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

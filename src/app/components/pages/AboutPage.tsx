import { Card, CardContent } from "../ui/card";
import { Award, Target, Eye, Users, TrendingUp, ShieldCheck } from "lucide-react";

export function AboutPage() {
  const stats = [
    { number: "10+", label: "Years of Experience" },
    { number: "5000+", label: "Successful Deliveries" },
    { number: "500+", label: "Satisfied Clients" },
    { number: "50+", label: "Fleet Vehicles" },
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-accent" />,
      title: "Reliability",
      description: "We pride ourselves on consistent, dependable service that our clients can count on.",
    },
    {
      icon: <Users className="w-12 h-12 text-accent" />,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We work closely with clients to exceed expectations.",
    },
    {
      icon: <Award className="w-12 h-12 text-accent" />,
      title: "Quality",
      description: "Premium materials and professional service in every delivery and transaction.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-accent" />,
      title: "Innovation",
      description: "Continuously improving our processes with the latest technology and best practices.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl mb-6">About ASR INFRA</h1>
          <p className="text-xl text-[#c8d9e8] max-w-3xl mx-auto">
            Building trust through reliable transportation and quality supply solutions
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 text-primary">Who We Are</h2>
              <p className="text-muted-foreground mb-4 text-lg">
                ASR INFRA is a leading provider of transportation and supply services, specializing in goods
                carrier services, sand, and steel supply. With over a decade of experience in the industry,
                we have built a reputation for reliability, quality, and customer satisfaction.
              </p>
              <p className="text-muted-foreground mb-4 text-lg">
                Our team of experienced professionals and modern fleet of vehicles enable us to handle projects
                of all sizes, from small deliveries to large-scale construction supply operations. We are
                committed to providing timely, cost-effective solutions that help our clients succeed.
              </p>
              <p className="text-muted-foreground text-lg">
                Based in Mumbai, we serve clients across India, bringing the same level of dedication and
                professionalism to every project we undertake.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1772298783095-be38fa901232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjB3b3JrZXJzfGVufDF8fHx8MTc3MzkwMDAyMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="ASR INFRA Team"
                className="rounded-lg shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-[#e8f0f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-t-4 border-t-accent">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-12 h-12 text-accent mr-4" />
                  <h2 className="text-3xl text-primary">Our Mission</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To provide exceptional transportation and supply services that exceed customer expectations
                  through reliability, quality, and innovation. We strive to be the trusted partner for
                  businesses and individuals seeking efficient logistics solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-accent">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="w-12 h-12 text-accent mr-4" />
                  <h2 className="text-3xl text-primary">Our Vision</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To become India's most trusted and preferred transportation and supply company, known for
                  our commitment to excellence, sustainability, and customer satisfaction. We aim to set new
                  industry standards through continuous improvement and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Our Achievements</h2>
            <p className="text-muted-foreground text-lg">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#e8f0f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Our Values</h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="mb-3 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">Join Hundreds of Satisfied Clients</h2>
          <p className="text-xl mb-8 text-[#c8d9e8]">
            Experience the ASR INFRA difference. Contact us today to learn more about our services.
          </p>
        </div>
      </section>
    </div>
  );
}

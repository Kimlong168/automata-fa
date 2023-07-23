import Header from "../components/Header";
import MemberCard from "../components/MemberCard";
import members from "../memberData";

const About = () => {
  
  const memberList = members.map((member) => (
    <MemberCard
      key={member.id}
      name={member.name}
      position={member.position}
      image={member.image}
    />
  ));

  return (
    <div>
      <Header />
      <br />
      <div id="team" className="section relative pb-8 bg-white">
        <header>
          <h1 className="text-5xl text-orange-500 font-bold text-center py-6 pb-10 uppercase">
            Our Project Memebers
          </h1>
        </header>
        <div className="container mx-auto">
          <div className="flex flex-wrap flex-row justify-center gap-6">
            {memberList}
          </div>
        </div>
        <footer className="px-10 w-1/2 mx-auto text-blue-950">
          <marquee direction="left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            exercitationem at doloribus. Nisi veritatis sint fugiat, delectus
            accusamus, magnam laborum ex rem ducimus laboriosam similique
            doloremque id voluptatem quasi numquam.
          </marquee>
        </footer>
      </div>
    </div>
  );
};

export default About;

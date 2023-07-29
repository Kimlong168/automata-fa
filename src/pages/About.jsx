import Header from "../components/Header";
import MemberCard from "../components/MemberCard";
import members from "../memberData";
import RunningText from "../components/RunningText";
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
          <h1 className="text-3xl md:text-5xl text-orange-500 font-bold text-center py-6 pb-10 uppercase">
            Our Project Memebers
          </h1>
        </header>
        <div className="container mx-auto">
          <div className="flex flex-wrap flex-row justify-center gap-6">
            {memberList}
          </div>
        </div>
        <footer className="px-10 md:w-1/2 mx-auto text-blue-950">
          <marquee direction="left">
            <RunningText />
          </marquee>
        </footer>
      </div>
    </div>
  );
};

export default About;

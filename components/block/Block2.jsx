import { useTranslation } from "react-i18next";

const Block2 = () => {

  const { t } = useTranslation('home')

  const blockContent = [
    {
      id: 1,
      icon: "images/resource/process-1.png",
      title: (
        <>
          {t('process_section_block1')} <br/>
          {t('process_section_block1_br')}
        </>
      ),
    },
    {
      id: 2,
      icon: "images/resource/process-2.png",
      title: (
        <>
          {t('process_section_block2')} <br/>
          {t('process_section_block2_br')}
        </>
      ),
    },
    {
      id: 3,
      icon: "images/resource/process-3.png",
      title: (
        <>
          {t('process_section_block3')} <br/>
          {t('process_section_block3_br')}
        </>
      ),
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="process-block col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="icon-box">
            <img src={item.icon} alt="how it works" />
          </div>
          <h4>{item.title}</h4>
        </div>
      ))}
    </>
  );
};

export default Block2;

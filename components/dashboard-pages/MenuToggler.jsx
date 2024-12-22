import { useDispatch } from "react-redux";
import { menuToggle } from "../../app/features/toggle/toggleSlice";
import { useTranslation } from "react-i18next";

const MenuToggler = () => {

  const { t } = useTranslation('common')
  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className="mb-4 ms-0 show-1266">
      <button
        onClick={menuToggleHandler}
        type="button"
        className="theme-btn toggle-filters"
      >
        <span className="flaticon-menu-1"></span> {t('Menu')}
      </button>
    </div>
  );
};

export default MenuToggler;

import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = function () {
    dispatch(setSearchValue(""));
    setValue("");

    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  const onChangeInput = function (event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);

    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src="/img/search.svg" alt="" />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
      />
      {value && (
        <img
          onClick={() => {
            onClickClear();
          }}
          src="img/close.svg"
          alt=""
          className={styles.clearIcon}
        />
      )}
    </div>
  );
};
export default Search;

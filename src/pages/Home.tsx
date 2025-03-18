import React from "react";
import Sort from "../components/Sort";
import qs from "qs";
import { useNavigate } from "react-router";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/index";
import {
  FilterSliceState,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, SearchPizzaParams } from "../redux/slices/pizzaSlice";
import { useSelector, useDispatch } from "react-redux";
import { sortList } from "../components/Sort";
import { Rootstate, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: Rootstate) => state.filter
  );
  const pizzas = useSelector((state: Rootstate) => state.pizza.items);
  const { status } = useSelector((state: Rootstate) => state.pizza);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const setCurrentPageHome = function (number: number) {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async function () {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => params.sortBy === obj.sortProperty);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
    }

    isSearch.current = true;
  }, []);

  const onChangeCategory = React.useCallback(function (idx: number) {
    dispatch(setCategoryId(idx));
  }, []);

  React.useEffect(() => {
    if (isSearch.current === false) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    getPizzas();
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas1 = pizzas.map((obj: any) => (
    <PizzaBlock {...obj} key={obj.id} />
  ));
  const skeletons = [...new Array(6)].map((obj, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка :(</h2> <br />
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas1}
        </div>
      )}

      <Pagination
        onChangePage={(number) => {
          setCurrentPageHome(number);
        }}
      />
    </div>
  );
};
export default Home;

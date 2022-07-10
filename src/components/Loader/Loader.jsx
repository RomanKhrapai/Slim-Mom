import s from './Loader.module.scss';


const Loader = () => {
return (<div className={s.loader}>
  <span>S</span>
  <span>l</span>
  <span>i</span>
  <span>m</span>
  <span>M</span>
  <span>o</span>
  <span>m</span>
  
 <div className={s.covers}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>)
};

export default Loader;
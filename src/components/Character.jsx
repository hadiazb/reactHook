import React, {
	useState,
	useEffect,
	useReducer,
	useMemo,
} from 'react';

const initialState = {
	favorites: [],
};

const favoriteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVORITE':
			return {
				...state,
				favorites: [...state.favorites, action.payload],
			};
		default:
			return state;
	}
};

const Character = () => {
	const [character, setCharacter] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');

	const [favorite, dispatch] = useReducer(
		favoriteReducer,
		initialState
	);

	const handleClick = (favorite) => {
		dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite });
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const callData = () => {
		fetch('https://rickandmortyapi.com/api/character/')
			.then((response) => response.json())
			.then((data) => {
				setCharacter(data.results);
				setLoading(!loading);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		callData();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const filterUsers = useMemo(
		() =>
			character.filter((user) => {
				return user.name
					.toLowerCase()
					.includes(search.toLowerCase());
			}),
		[character, search]
	);

	return (
		<div>
			<h2>Characters</h2>

			<ul>
				{favorite.favorites.map((item) => (
					<li key={item.id}>
						<h4>{item.name}</h4>
						<p>{item.status}</p>
						<p>{item.species}</p>
						<img src={item.image} alt='' />
					</li>
				))}
			</ul>

			<div>
				<input
					type='text'
					value={search}
					onChange={handleSearch}
				/>
			</div>

			<ul>
				{loading
					? filterUsers.map((item) => (
							<li key={item.id}>
								<h4>{item.name}</h4>
								<p>{item.status}</p>
								<p>{item.species}</p>
								<img src={item.image} alt='' />
								<button
									type='button'
									onClick={() => handleClick(item)}
								>
									Agregar a Favoritos
								</button>
							</li>
					  ))
					: 'Cargando...'}
			</ul>
		</div>
	);
};

export default Character;

package web;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.junit.matchers.JUnitMatchers.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.view.InternalResourceView;

import web.data.SpittleRepository;

public class HomeControllerTest {
	@Test
	public void testHomePage() throws Exception {
		HomeController controller = new HomeController();
		MockMvc mockMvc = standaloneSetup(controller).build();
		mockMvc.perform(get("/homeC")).andExpect(view().name("home"));
	}

	@SuppressWarnings("deprecation")
	@Test
	public void shouldShowRecentSpittles() throws Exception {
		List<Spittr> expectedList = createExpectedList(20);
		SpittleRepository mockRepository = mock(SpittleRepository.class);
		when(mockRepository.findSpittles(Long.MAX_VALUE, 20)).thenReturn(expectedList);

		SpittleController controller = new SpittleController(mockRepository);
		MockMvc mockMvc = standaloneSetup(controller)
				.setSingleView(new InternalResourceView("/WEB-INFO/views/home.jsp")).build();

		mockMvc.perform(get("/spittles")).andExpect(view().name("home"))
				.andExpect(model().attributeExists("spittrList"))
				.andExpect(model().attribute("spittrList", hasItems(expectedList.toArray())));

	}

	@Test
	public void testShowRegister() throws Exception {
		HomeController controller = new HomeController();
		MockMvc mockMvc = standaloneSetup(controller).build();
		mockMvc.perform(get("/sr")).andExpect(view().name("registerForm"));
	}

	private List<Spittr> createExpectedList(int i) {
		List<Spittr> list = new ArrayList<Spittr>();
		for (int j = 0; j < i; j++) {
			list.add(new Spittr(new Date(), "Spittr" + i));
		}
		return list;
	}
}

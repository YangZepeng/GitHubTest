package web.data;

import java.util.List;

import org.springframework.stereotype.Component;

import web.Spittr;


public interface SpittleRepository {
	List<Spittr> findSpittles(long max, int count);
}

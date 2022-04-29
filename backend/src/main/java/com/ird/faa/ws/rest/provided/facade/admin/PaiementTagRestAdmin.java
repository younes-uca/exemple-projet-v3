package  com.ird.faa.ws.rest.provided.facade.admin;

import com.ird.faa.service.admin.facade.PaiementTagAdminService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.ird.faa.bean.PaiementTag;
import com.ird.faa.ws.rest.provided.converter.PaiementTagConverter;
import com.ird.faa.ws.rest.provided.vo.PaiementTagVo;

@Api("Manages paiementTag services")
@RestController
@RequestMapping("api/admin/paiementTag")
public class PaiementTagRestAdmin {

@Autowired
private PaiementTagAdminService paiementTagService;

@Autowired
private PaiementTagConverter paiementTagConverter;


            @ApiOperation("Updates the specified  paiementTag")
            @PutMapping("/")
            public  PaiementTagVo update(@RequestBody  PaiementTagVo  paiementTagVo){
            PaiementTag paiementTag = paiementTagConverter.toItem(paiementTagVo);
            paiementTag = paiementTagService.update(paiementTag);
            return paiementTagConverter.toVo(paiementTag);
            }

    @ApiOperation("Finds a list of all paiementTags")
    @GetMapping("/")
    public List<PaiementTagVo> findAll(){
        return paiementTagConverter.toVo(paiementTagService.findAll());
    }

    @ApiOperation("Finds a paiementTag with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public PaiementTagVo findByIdWithAssociatedList(@PathVariable Long id){
    return paiementTagConverter.toVo(paiementTagService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search paiementTag by a specific criteria")
    @PostMapping("/search")
    public List<PaiementTagVo> findByCriteria(@RequestBody PaiementTagVo paiementTagVo){
        return paiementTagConverter.toVo(paiementTagService.findByCriteria(paiementTagVo));
        }

            @ApiOperation("Finds a paiementTag by id")
            @GetMapping("/id/{id}")
            public PaiementTagVo findById(@PathVariable Long id){
            return paiementTagConverter.toVo(paiementTagService.findById(id));
            }

            @ApiOperation("Saves the specified  paiementTag")
            @PostMapping("/")
            public PaiementTagVo save(@RequestBody PaiementTagVo paiementTagVo){
            PaiementTag paiementTag = paiementTagConverter.toItem(paiementTagVo);
            paiementTag = paiementTagService.save(paiementTag);
            return paiementTagConverter.toVo(paiementTag);
            }

            @ApiOperation("Delete the specified paiementTag")
            @DeleteMapping("/")
            public int delete(@RequestBody PaiementTagVo paiementTagVo){
            PaiementTag paiementTag = paiementTagConverter.toItem(paiementTagVo);
            return paiementTagService.delete(paiementTag);
            }

            @ApiOperation("Deletes a paiementTag by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return paiementTagService.deleteById(id);
            }
        @ApiOperation("find by paiement reference")
        @GetMapping("/paiement/reference/{reference}")
        public List<PaiementTag> findByPaiementReference(@PathVariable String reference){
        return paiementTagService.findByPaiementReference(reference);
        }

        @ApiOperation("delete by paiement reference")
        @DeleteMapping("/paiement/reference/{reference}")
        public int deleteByPaiementReference(@PathVariable String reference){
        return paiementTagService.deleteByPaiementReference(reference);
        }

        @ApiOperation("find by paiement id")
        @GetMapping("/paiement/id/{id}")
        public List<PaiementTag> findByPaiementId(@PathVariable Long id){
        return paiementTagService.findByPaiementId(id);
        }

        @ApiOperation("delete by paiement id")
        @DeleteMapping("/paiement/id/{id}")
        public int deleteByPaiementId(@PathVariable Long id){
        return paiementTagService.deleteByPaiementId(id);
        }

        @ApiOperation("find by tag reference")
        @GetMapping("/tag/reference/{reference}")
        public List<PaiementTag> findByTagReference(@PathVariable String reference){
        return paiementTagService.findByTagReference(reference);
        }

        @ApiOperation("delete by tag reference")
        @DeleteMapping("/tag/reference/{reference}")
        public int deleteByTagReference(@PathVariable String reference){
        return paiementTagService.deleteByTagReference(reference);
        }

        @ApiOperation("find by tag id")
        @GetMapping("/tag/id/{id}")
        public List<PaiementTag> findByTagId(@PathVariable Long id){
        return paiementTagService.findByTagId(id);
        }

        @ApiOperation("delete by tag id")
        @DeleteMapping("/tag/id/{id}")
        public int deleteByTagId(@PathVariable Long id){
        return paiementTagService.deleteByTagId(id);
        }



            }
